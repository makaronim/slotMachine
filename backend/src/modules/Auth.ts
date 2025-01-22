import {User} from "./User";
import {Helpers} from "../helpers/helpers";
import {ISignIn, IUser} from "../interfaces/IUser";

export class Auth {
    static async login({username, password}: ISignIn): Promise<IUser | string> {
        const user = await User.getUserByUsername(username);
        if (!user) {
            return 'user not found';
        }
        const isMatch = await Helpers.isPasswordMatch(password, user.password);
        if (!isMatch) {
            return 'password do not match'
        }
        return user

    }
}
