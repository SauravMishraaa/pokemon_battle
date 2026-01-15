import express from 'express';
import { battle } from '../controllers/battleController.js';

const router = express.Router();

router.post('/', battle);

export default router;