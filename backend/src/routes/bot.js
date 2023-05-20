import express from 'express';
const line = require('@line/bot-sdk');
import dotenv from 'dotenv-defaults';
dotenv.config();

const botRouter = express.Router();

const config = {
  channelId: process.env.LINE_BOT_ID,
  channelSecret: process.env.LINE_BOT_SECRET,
  channelAccessToken: process.env.LINE_BOT_TOKEN
};

const client = new line.Client(config);

const handleEvent = event => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

botRouter.post('/callback', line.middleware(config), (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.body.events);
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

export default botRouter;