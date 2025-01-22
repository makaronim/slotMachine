export interface IUser {
    id: number;
    username: string;
    password: string;
    created_at: string;
}

export interface ICreateUser {
    username: string;
    password: string;
}

export interface ISignIn {
    username: string;
    password: string;
}

export interface IUpateUserScore {
    user_id: number;
    credits: number;
}
