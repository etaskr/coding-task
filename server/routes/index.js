/* @flow */

'use strict';

// import path from 'path';
import express from 'express';
import weather from './weather';

const router = express.Router();


/**
 * route modules
 */
router.use('/weather', weather);


export default router;
