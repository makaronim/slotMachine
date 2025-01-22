export interface IResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface IRollBackendResponse {
    status: number;
    message: string;
    symbols: string[];
    credits: number;
}

export interface IStartGameBackendResponse {
    status: boolean;
    message: object;
}

export interface IGameData {
    id: number;
    user_id: number;
    credits: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface IGameCashOut {
    id: number;
    user_id: number;
    credits: number;
    status: string;
    message: string;
}

export interface ISignInResponse {
    message: object;
}
