import express from 'express';
import {
    getAllFollowedTeam,
    addFollowedTeam,
    getFollowedTeamById,
    getFollowedTeamByUserId
} from "../controllers/FollowedTeamController";

const router = express.Router();

// GET localhost:8000/comments/:id
router.get('/', getAllFollowedTeam); //GET /followedTeams
router.get('/:id',getFollowedTeamById) //GET /followedTeams/:id
router.get('/user/:userId', getFollowedTeamByUserId) //GET /followedTeams/user/:userId
router.get(`/:add`, addFollowedTeam); //POST /followedTeams

export default router;