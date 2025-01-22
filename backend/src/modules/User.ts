import {ICreateUser, IUpateUserScore, IUser} from "../interfaces/IUser";
import {databaseProvider} from "../db/databaseProvider";
import {RowDataPacket} from "mysql2";
import {Helpers} from "../helpers/helpers";

export class User {

    static async create({username, password}: ICreateUser): Promise<IUser | null> {
        const hashed_password = await Helpers.hashPassword(password);
        const [result]: any = await databaseProvider.execute(
            'INSERT INTO users (username, password) VALUES (?,?)', [username, hashed_password]
        )
        if (!result) {
            return null
        }
        const insertId = result.insertId

        return await this.getUserById(insertId);
    }

    static async getUserById(id: number): Promise<IUser | null> {
        const [rows]: [RowDataPacket[], any] = await databaseProvider.execute(
            'SELECT * FROM users WHERE id = ?', [id]
        );
        if (!rows || !rows.length) {
            return null;
        }
        return rows[0] as IUser;
    }

    static async getUserByUsername(username: string): Promise<IUser | null> {
        const [rows]: [RowDataPacket[], any] = await databaseProvider.execute(
            'SELECT * FROM users WHERE username = ?', [username]
        );
        if (!rows || !rows.length) {
            return null
        }
        return rows[0] as IUser;
    }

    static async updateUserCredits({user_id, credits}: IUpateUserScore): Promise<boolean> {
        const results: any = await databaseProvider.execute(
            'UPDATE users SET credits = ? WHERE id = ?', [credits,user_id]
        )
        return results[0].affectedRows !== 0;

    }

}


