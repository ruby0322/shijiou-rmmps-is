import express from 'express';

const router = express.Router();

// *** Routers ***

// Usage: import someApiRouter from './someApi.js'
// Usage: router.use('/someApi', someApiRouter);

import testRouter from './test.js'
router.use('/test', testRouter);

// *** End of routers ***


export default router;