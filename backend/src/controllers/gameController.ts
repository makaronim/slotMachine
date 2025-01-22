import {Request, Response} from "express";
import {Game} from "../modules/Game";
import {ISession, IUpdateSession} from "../interfaces/ISession";
import {Helpers} from "../helpers/helpers";
import {IRoll} from "../interfaces/IRoll";

export class GameController {

    static async start(req: Request, res: Response) {
        try {
            const {user_id} = req.body;
            if (!user_id) {
                throw new Error("User ID is required");
            }
            //When user start a new game insert a new session
            const newGame: ISession | null = await Game.start(user_id);
            if (!newGame) {
                throw new Error("Unable to start game");
            }
            res.status(200).json({status: true, message: newGame});
        } catch (error: any) {
            res.status(400).send({status: false, error: error.message});
        }
    }

    static async roll(req: Request, res: Response) {
        try {
            const game: ISession = req.body;
            if (!game) {
                throw new Error("Game not found!");
            }

            //Check if user has enough credits
            if (game.credits <= 0) {
                throw new Error("Not enough credits");
            }
            //If user has enough credit then -1 on credit
            const newCredits: number = game.credits - 1;

            //Get new credits from roll logic
            const gameRoll: IRoll = await Helpers.rollLogic(newCredits);
            //Calc new credits score
            const newCreditScore = newCredits + gameRoll.rewards;

            const updateGameScore: IUpdateSession = {id: game.id, newCredits: newCreditScore};

            //Update the game session with new credits;
            const updatedCreditScore = await Game.updateGame(updateGameScore)

            res.status(200).json({
                status: true,
                message: updatedCreditScore,
                symbols: gameRoll.symbols,
                credits: updatedCreditScore
            });
        } catch (error: any) {
            res.status(400).send({status: false, message: error.message});
        }
    }

    static async cashOut(req: Request, res: Response) {
        try {
            const {id, user_id, credits, status}: ISession = req.body;
            if (!id || !user_id || !credits || !status) {
                throw new Error("Game not found!");
            }
            //Start cash out logic to transfer credits to user;
            const didCashOut: boolean = await Game.cashOut({id, user_id, credits, status});
            if (!didCashOut) {
                throw new Error("There was a problem cashing out, please contact support");
            }
            res.status(200).json({status: true, message: `Congratulations, you just earned ${credits} credits`});
        } catch (error: any) {
            res.status(400).send({status: false, error: error.message});
        }
    }

}
