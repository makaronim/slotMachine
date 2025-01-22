import express from "express";
import {GameController} from "../controllers/gameController";

const gameRouter = express.Router();

// Start a new game session
gameRouter.post('/start', GameController.start);
gameRouter.post('/roll', GameController.roll);
gameRouter.post('/cashout', GameController.cashOut);
export default gameRouter;
