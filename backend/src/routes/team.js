import express from 'express';
import { createTeam, listTeams } from '../controllers/teamController.js';

const router = express.Router();

router.post('/', createTeam);
router.get('/', listTeams);

export default router;