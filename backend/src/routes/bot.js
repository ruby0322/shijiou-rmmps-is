import express from 'express';
import { Client, middleware } from '@line/bot-sdk';
import dotenv from 'dotenv-defaults';
import { db } from '../db.js';
import Customer from '../schema/Customer.js';
import { collection, setDoc, doc, getDoc  } from "firebase/firestore";


dotenv.config();

const botRouter = express.Router();

const config = {
  // channelId: process.env.LINE_BOT_ID,
  channelSecret: process.env.LINE_BOT_SECRET,
  channelAccessToken: process.env.LINE_BOT_TOKEN
};

const client = new Client(config);

const REPLYS = {
  ALREADY_WAITING: '很抱歉無法為您候位，因為您已在候位隊伍中。請耐心等候！',
  WAIT_SUCCESS: '候位成功！',
  WAIT_FAILURE: '',
  SYSTEM_ERROR: '系統錯誤，我們正在努力修復中！'
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

  if (userMessage === '我要候位') {
    if (!user.isWating) {  /* 消費者沒有在候位 */
      try {
        reply.push(REPLYS.WAIT_SUCCESS);
        const docRef = doc(db, 'variables', 'lastAssigned');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const assignedNumber = docSnap.data().number;
          reply.push(`您的候位號碼是 ${assignedNumber} 號。我們將在您即將到號時通知您，請耐心等候～`);
          user.isWating = true;
          setDoc(userRef, {...user});
        } else {
          reply.push(REPLYS.SYSTEM_ERROR);
        }
      } catch (e) {
        console.log(e);
        reply.push(REPLYS.WAIT_FAILURE);
      }
    } else {
      reply.push(REPLYS.ALREADY_WAITING);
    }
  } else if (userMessage === "") {

  } else if (userMessage === "") {

  } else if (userMessage === "") {

  } else {

  }

  // use reply API
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

export default botRouter;