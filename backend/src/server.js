import express from 'express';
import cors from 'cors';
import router from './routes/index.js';




const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use('/api', router);

app.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
