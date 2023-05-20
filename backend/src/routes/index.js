import express from 'express';

const router = express.Router();

// *** Routers ***

// Usage: import someApiRouter from './someApi.js'
// Usage: router.use('/someApi', someApiRouter);

import testRouter from './test.js';
import botRouter from './bot.js';

router.get("/", (req, res) => {
    res.status(200).send('Hello from RMMPS.');
})

router.use('/test', testRouter);
router.use('/bot', botRouter);

// *** End of routers ***

export default router;