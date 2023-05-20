import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import crypto from 'crypto';


const app = express();
const port = process.env.PORT || 4000;

const channelSecret = "..."; // Channel secret string
const body = "..."; // Request body string

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
