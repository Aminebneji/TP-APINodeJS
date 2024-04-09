import express from 'express';
import {getAllTeams} from "../controllers/TeamController";
import {getTeamByName} from "../controllers/TeamController";

const router = express.Router();

// GET localhost:8000/comments/:id
router.get('/', getAllTeams); // GET /teams
router.get('/:name', getTeamByName); // GET /teams/name

export default router;