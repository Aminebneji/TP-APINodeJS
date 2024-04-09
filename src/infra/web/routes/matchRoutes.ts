import express from 'express';
import {getAllMatchs} from "../controllers/MatchController";
import {getMatchsByScore} from "../controllers/MatchController";

const router = express.Router();

// GET localhost:8000/comments/:id
router.get('/', getAllMatchs); // GET /matchs
router.get(`/:score`, getMatchsByScore); // GET /matchs/score

export default router;