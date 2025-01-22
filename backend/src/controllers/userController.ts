import {Request, Response} from 'express';
import {User} from "../modules/User";
import {IUser} from "../interfaces/IUser";

export class UserController {

    static async create(req: Request, res: Response) {
        try {
            const {username, password} = req.body;
            if (!username || !password) {
                throw new Error('Name and Password is required');
            }
            const user: IUser | null = await User.create({username, password});
            if (!user) {
                throw new Error('Unable to create new user');
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

    static async get(req: Request, res: Response) {
        try {
            const {id} = req.params;
            if (!id) {
                throw new Error('Id is required');
            }
            const user: IUser | null = await User.getUserById(parseInt(id));
            if (!user) {
                throw new Error('User not found');
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

}
