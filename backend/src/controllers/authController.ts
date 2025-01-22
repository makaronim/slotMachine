import {Request, Response} from "express";
import {Auth} from "../modules/Auth";
import {IUser} from "../interfaces/IUser";

export class AuthController {

    static async login(req: Request, res: Response) {
        try {
            const {username, password} = req.body;
            if (!username || !password) {
                throw new Error("Missing username or password");
            }
            const user: string | IUser = await Auth.login({username, password});
            if (typeof user === "string") {
                throw new Error(user);
            }
            res.status(200).json({status: true, message: user});
        } catch (error: any) {
            res.status(400).send({status: false, message: error.message});
        }
    }

}
