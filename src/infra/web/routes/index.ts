import express from 'express';
import teamRoutes from "./teamRoutes";
import matchRoutes from "./matchRoutes";

const router = express.Router();

router.use('/teams', teamRoutes);
router.use('/matchs', matchRoutes)

export default router;