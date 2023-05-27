import express from 'express';
import { Client, middleware } from '@line/bot-sdk';
import dotenv from 'dotenv-defaults';
import { db } from '../db.js';
import { collection, addDoc } from "firebase/firestore";


dotenv.config();

const botRouter = express.Router();

const config = {
  // channelId: process.env.LINE_BOT_ID,
  channelSecret: process.env.LINE_BOT_SECRET,
  channelAccessToken: process.env.LINE_BOT_TOKEN
};

const client = new Client(config);

const handleEvent = async event => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const userMessage = event.message.text;
  let replyPackage = {};
  if (userMessage === "我要候位！") {
    const replyMessage = "不要＝＝";
    replyPackage = { type: "text", text: replyMessage };
  }
  else if (userMessage === "中午吃什麼") {
    const replyMessage = "大泰屋";
    replyPackage = { type: "text", text: replyMessage };
  }
  else {
    const docRef = await addDoc(collection(db, "messages"), {
      message: userMessage,
      timestamp: event.timestamp
    });
    console.log("Document written with ID: ", docRef.id)
  
    // create a echoing text message
    replyPackage = { type: 'text', text: userMessage };  
    // use reply API
  }
  return client.replyMessage(event.replyToken, replyPackage);

}

botRouter.post('/callback', middleware(config), (req, res) => {
  console.log(req);
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});




export default botRouter;