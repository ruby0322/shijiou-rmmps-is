import express from 'express';
import { Client, middleware } from '@line/bot-sdk';
import dotenv from 'dotenv-defaults';
import { db } from '../db.js';
import Customer from '../schema/Customer.js';
import WaitRequest from '../schema/WaitRequest.js';
import { collection, setDoc, doc, getDoc, getDocs, query, where, addDoc, updateDoc  } from "firebase/firestore";
import { strftime, isNumber } from '../utils.js';

const REPLYS = {
    ALREADY_WAITING: '很抱歉無法為您候位，因為您已在候位隊伍中。請耐心等候！',
    WAIT_SUCCESS: '候位成功！',
    WAIT_FAILURE: '候位失敗',
    SYSTEM_ERROR: '系統錯誤，我們正在努力修復中！',
    CANCEL_FAILURE: '很抱歉無法為您取消候位，因為您目前並沒有在候位。',
    CANCEL_SUCCESS: '取消候位成功！',
    QUERY_GROUP_SIZE: '好的，請問共幾人用餐呢？\n請回覆一個阿拉伯數字，代表人數。',
    INVALID_GROUP_SIZE: '您輸入的人數不符合格式，候位失敗。\n若要再次候位，請重新按下候位按鈕，或輸入「我要候位」。',
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

  const config = {
    // channelId: process.env.LINE_BOT_ID,
    channelSecret: process.env.LINE_BOT_SECRET,
    channelAccessToken: process.env.LINE_BOT_TOKEN
  };
  
const client = new Client(config);
  
export { REPLYS, ADMINS, getTextMessage, pushMessage, notifyLINEUser, client };