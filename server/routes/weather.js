/* @flow */

'use strict';

import express from 'express';
import * as weatherController from '../controllers/weather';

const router = express.Router();

// GET /weather - return weather forecast JSON
router.get('/', weatherController.getForecast);

export default router;
