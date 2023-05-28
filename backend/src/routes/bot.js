import express from 'express';
import { Client, middleware } from '@line/bot-sdk';
import dotenv from 'dotenv-defaults';
import { db } from '../db.js';
import Customer from '../schema/Customer.js';
import { collection, setDoc, doc, getDoc, getDocs, query, where  } from "firebase/firestore";


dotenv.config();

const botRouter = express.Router();

const config = {
  // channelId: process.env.LINE_BOT_ID,
  channelSecret: process.env.LINE_BOT_SECRET,
  channelAccessToken: process.env.LINE_BOT_TOKEN
};

const client = new Client(config);

const todayWaitRef = collection(db, 'todayWaitRequests');

const REPLYS = {
  ALREADY_WAITING: '很抱歉無法為您候位，因為您已在候位隊伍中。請耐心等候！',
  WAIT_SUCCESS: '候位成功！',
  WAIT_FAILURE: '候位失敗',
  SYSTEM_ERROR: '系統錯誤，我們正在努力修復中！',
  CANCEL_FAILURE: '很抱歉無法為您取消候位，因為您目前並沒有在候位。',
  CANCEL_SUCCESS: '取消候位成功！',
}

const ADMINS = {
  RUBY: 'U3dc4e9a67c16a598c1d4cf605d17065f',
}

const getTextMessage = (msg) => ({ type: 'text', text: msg });

const pushMessage = async (userId, msg) => {
  console.log(`正在推送訊息給 ${userId}...`);
  console.log(`推送訊息內容為：\n${msg}`);
  await client.pushMessage(userId, getTextMessage(msg));
}

const notifyLINEUser = async (userId) => {
  await pushMessage(userId, '親愛的顧客，您的座位準備好囉！\n我們將為您保留座位 10 分鐘，請您儘快到店報到～');
}

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

  // const docRef = await addDoc(collection(db, "messages"), {
  //   message: userMessage,
  //   timestamp: event.timestamp
  // });
  // console.log("Document written with ID: ", docRef.id)

  // create a echoing text message
  // const echo = { type: 'text', text: userMessage };
  let reply = [];

  try {
    if (userMessage === '我要候位') {
      if (!user.isWating) {  /* 消費者沒有在候位 */
        const docRef = doc(db, 'variables', 'lastAssigned');
        const docSnap = await getDoc(docRef);
        
        const assignedNumber = docSnap.data().number+1;
        reply.push(`您的候位號碼是 ${assignedNumber} 號。我們將在您即將到號時通知您，請耐心等候～`);
        user.isWating = true;

        await setDoc(userRef, { ...user });  // 更新使用者 isWaiting 狀態
        await setDoc(docRef, { number: assignedNumber });  // 更新最後分配號碼

        // 新增候位請求至 DB
        addDoc(collection(db, "cities"), {
          name: "Tokyo",
          country: "Japan"
        });

        reply.push(REPLYS.WAIT_SUCCESS);
      } else {
        reply.push(REPLYS.ALREADY_WAITING);
      }
    } else if (userMessage === "取消候位") {
      if (user.isWating) {
        user.isWating = false;
        reply.push(REPLYS.CANCEL_SUCCESS);
        await setDoc(userRef, { ...user });
      } else {
        reply.push(REPLYS.CANCEL_FAILURE);
      }
    } else if (userMessage === "候位狀況") {
      const q = query(todayWaitRef, where('isWating', '==', true))
      const waitingRequestsSnapShot = await getDocs(q);
      if (user.isWating) {

        let userRequestMadeTime = 0;
        let others = [];
        waitingRequestsSnapShot.forEach((document) => {
          if (document.data().lineUserId !== userId) {
            others.push(document.data().requestMadeTime);
          } else {
            userRequestMadeTime = document.data().requestMadeTime;
          }
        });
        const beforeUserCount = others.filter(x => x < userRequestMadeTime).length;
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

export { botRouter, notifyLINEUser };