import express from 'express';
import {getAllTeams, getMatchesByTeam,getTeamByName} from "../controllers/TeamController";

const router = express.Router();

// GET localhost:8000/comments/:id
router.get('/', getAllTeams); // GET /teams
router.get('/:name', getTeamByName); // GET /teams/name
router.get('/matches/:name',getMatchesByTeam)

export default router;