import {databaseProvider} from "../db/databaseProvider";
import {ISession, IUpdateSession} from "../interfaces/ISession";
import {RowDataPacket} from "mysql2";
import {IUser} from "../interfaces/IUser";
import {User} from "./User";

export class Game {

    static async start(user_id: number): Promise<ISession | null> {
        const [result]: any = await databaseProvider.execute(
            'INSERT INTO sessions (user_id, credits, status) VALUES (?, ?, ?)',
            [user_id, 10, 'active']
        );
        if (!result) {
            return null
        }
        const newGame: ISession | null = await this.getGameById(result.insertId);
        if (!newGame) {
            return null;
        }
        return newGame;

    }

    static async getGameById(id: number): Promise<ISession | null> {
        const [rows]: [RowDataPacket[], any] = await databaseProvider.execute(
            'SELECT * FROM sessions WHERE id = ?', [id]
        );
        if (!rows || !rows.length) {
            return null;
        }
        return rows[0] as ISession;
    }

    static async updateGame({id, newCredits}: IUpdateSession): Promise<number | null> {
        const results: any = await databaseProvider.execute(
            'UPDATE sessions SET credits = ?, updated_at = NOW() WHERE id = ?',
            [newCredits, id]
        )
        if (results.affectedRows === 0) {
            return null;
        }
        return newCredits;
    }

    static async cashOut({id, credits, user_id, status}: ISession): Promise<boolean> {
        //Update user credits with the new credit score
        const user: boolean = await User.updateUserCredits({user_id, credits});
        if (!user) {
            return false
        }
        //Update game status to close
        const results: any = await databaseProvider.execute(
            'UPDATE sessions SET status = ?, updated_at = NOW() WHERE id = ?',
            [status, id]
        )
        return results[0].affectedRows !== 0;

    }

}
