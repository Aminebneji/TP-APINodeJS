import express from 'express';
import {getAllFollowedTeam} from "../controllers/FollowedTeamController";
import {addFollowedTeam} from "../controllers/FollowedTeamController";
import {getMatchesByTeam} from "../controllers/TeamController";

const router = express.Router();

// GET localhost:8000/comments/:id
router.get('/', getAllFollowedTeam);
router.get(`/:add`, addFollowedTeam);

export default router;