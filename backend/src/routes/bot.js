import linebot from 'linebot';

const bot = linebot({
  channelId: process.env.LINE_BOT_ID,
  channelSecret: process.env.LINE_BOT_SECRET,
  channelAccessToken: process.env.LINE_BOT_TOKEN
});

bot.on('message', event => {
    const userMessage = event.message.text;
    const replyMessage = '...';
    
    // LINE Bot Logic
    
    event.reply(replyMessage).then(data => {
        console.log('有人傳訊息給我！');
    }).catch(error =>  {
    });
});

export default bot;