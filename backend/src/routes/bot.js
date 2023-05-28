import express from 'express';
import { middleware } from '@line/bot-sdk';
import dotenv from 'dotenv-defaults';
import { db } from '../db.js';
import Customer from '../schema/Customer.js';
import WaitRequest from '../schema/WaitRequest.js';
import { collection, setDoc, doc, getDoc, getDocs, query, where, addDoc, updateDoc  } from "firebase/firestore";
import { strftime, isNumber } from '../utils.js';
import { client, pushMessage, ADMINS, REPLYS, getTextMessage } from '../botUtils.js';
// import { }

dotenv.config();

const botRouter = express.Router();

const todayWaitRef = collection(db, 'todayWaitRequests');

const handleEvent = async event => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const userId = event.source.userId;
  console.log(userId);

  // Check if the user is in the 'customers' collection
  // if not, add new customer
  const userRef = doc(db, 'customers', userId);
  const userSnap = await getDoc(userRef);
  let user;
  if (userSnap.exists()) {
    user = userSnap.data();
  } else {
    user = new Customer(userId);
    await setDoc(userRef, {...user});
  }

  const userMessage = event.message.text;

  let reply = [];

  try {

    if (user.isRequesting) {
      if (isNumber(userMessage)) {
        const groupSize = parseInt(userMessage, 10);
        const docRef = doc(db, 'variables', 'lastAssigned');
        const docSnap = await getDoc(docRef);
        
        const assignedNumber = docSnap.data().number+1;
        const newReq = new WaitRequest(assignedNumber, userId, groupSize);
        reply.push(REPLYS.WAIT_SUCCESS);
        reply.push(`[候位資訊]\n\n候位號碼：${assignedNumber}\n用餐人數：${groupSize}\n發起時間：${strftime('%A %l:%M%P %e %b %Y', new Date(newReq.requestMadeTime + 480 * 60000))}`);
        reply.push(`我們將在您的座位準備好時通知您，請耐心等候～`);
        user.isWaiting = true;
        
        await setDoc(docRef, { number: assignedNumber });  // 更新最後分配號碼

        // 新增候位請求至 DB
        const newReqRef = await addDoc(collection(db, 'todayWaitRequests'), { ...newReq });
        user.waitRequestId = newReqRef.id;

      } else {  
        reply.push(REPLYS.INVALID_GROUP_SIZE);
      }
      user.isRequesting = false;
      await setDoc(userRef, { ...user });  // 更新使用者
    } else if (userMessage === '我要候位') {
      if (!user.isWaiting) {  /* 消費者沒有在候位 */
        reply.push(REPLYS.QUERY_GROUP_SIZE);
        user.isRequesting = true;
        await setDoc(userRef, { ...user });  // 更新使用者 isWaiting 狀態
      } else {
        reply.push(REPLYS.ALREADY_WAITING);
      }
    } else if (userMessage === "取消候位") {
      if (user.isWaiting) {
        // 更新 WaitRequest 狀態：isWaiting = false, status = 'canceled'
        await updateDoc(doc(db, 'todayWaitRequests', user.waitRequestId), { isWaiting: false, status: 'canceled', arriveTime: Date.now() });

        // 更新 Customer 狀態：isWaiting = false, waitRequestId = null
        user.isWaiting = false;
        user.waitRequestId = null;
        await setDoc(userRef, { ...user });
        reply.push(REPLYS.CANCEL_SUCCESS);

      } else {
        reply.push(REPLYS.CANCEL_FAILURE);
      }
    } else if (userMessage === "候位狀況") {
      const q = query(todayWaitRef, where('isWaiting', '==', true))
      const waitingRequestsSnapShot = await getDocs(q);
      if (user.isWaiting) {

        let userRequestMadeTime = 0;
        let others = [];
        waitingRequestsSnapShot.forEach((document) => {
          console.log(`document => ${document.data()}`)
          if (document.data().lineUserId !== userId) {
            others.push(document.data().requestMadeTime);
          } else {
            userRequestMadeTime = document.data().requestMadeTime;
          }
        });
        const beforeUserCount = others.filter(x => x < userRequestMadeTime).length;
        console.log(`others => ${others}`);
        console.log(`userRequestsMadeTime => ${userRequestMadeTime}`);
        reply.push(`隊伍中還有 ${beforeUserCount} 組客人在您的前面。請耐心等候～`);
        
      } else {
        reply.push(`隊伍中有 ${waitingRequestsSnapShot.length} 組客人正在候位。`);
      }
    } else if (userMessage === "") {
      
    } else {
      
    }
  
  } catch (e) {
    console.log(e);
    await pushMessage(ADMINS.RUBY, `[系統推送] 系統錯誤，錯誤訊息如下：\n${e}`)
    reply.push(REPLYS.SYSTEM_ERROR);
  }
  // use reply API
  for (let i = 0; i < reply.length; ++i)
    reply[i] = getTextMessage(reply[i]);
  return client.replyMessage(event.replyToken, reply);
}

botRouter.post('/callback', middleware(config), (req, res) => {
  // console.log(req);

  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

export { botRouter };