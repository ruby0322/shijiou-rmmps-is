import express from 'express';

const router = express.Router();

// *** Routers ***

// Usage: import someApiRouter from './someApi.js'
// Usage: router.use('/someApi', someApiRouter);

import testRouter from './test.js';
import bot from './bot.js';

router.use('/test', testRouter);
router.post('/bot', bot.parser());

// *** End of routers ***


export default router;