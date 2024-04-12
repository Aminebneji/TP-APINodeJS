import express from 'express';
import {getAllMatchs} from "../controllers/MatchController";
import {getMatchsByScore} from "../controllers/MatchController";
import {getMatchesByTeamName} from "../controllers/MatchController"
const router = express.Router();

// GET localhost:8000/comments/:id
router.get('/', getAllMatchs); // GET /matches
router.get(`/:score`, getMatchsByScore); // GET /matches/score
router.get('/team/:name', getMatchesByTeamName) //GET /team/:name

export default router;