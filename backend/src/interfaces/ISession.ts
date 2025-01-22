export interface ISession {
    id: number;
    user_id: number;
    credits: number;
    status: string;
}

export interface IUpdateSession {
    id: number;
    newCredits: number;
}
