import express from 'express';

const router = express.Router();

// *** Routers ***

// Usage: import someApiRouter from './someApi.js'
// Usage: router.use('/someApi', someApiRouter);

import testRouter from './test.js';
import { botRouter } from './bot.js';
import menuRouter from './menu.js';
import fohRouter from './foh.js';
import waitRequestRouter from './wait.js';

router.get("/", (req, res) => {
    res.status(200).send('Hello from RMMPS.');
})

router.use('/bot', botRouter);
router.use(express.json());
router.use('/test', testRouter);
router.use("/menu", menuRouter);
router.use("/foh", fohRouter);
router.use("/wait", waitRequestRouter);


// *** End of routers ***

export default router;