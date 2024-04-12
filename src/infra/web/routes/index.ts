import express from 'express';
import teamRoutes from "./teamRoutes";
import matchRoutes from "./matchRoutes";
import userRoutes from "./userRoutes";
import followedTeamRoutes from "./followedTeamRoutes";

const router = express.Router();

router.use('/teams', teamRoutes);
router.use('/matches', matchRoutes);
router.use('/followedTeams', followedTeamRoutes);
router.use('/users', userRoutes);

export default router;