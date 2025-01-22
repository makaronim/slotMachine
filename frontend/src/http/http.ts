import axios from 'axios';
import {IResponse} from "../types/interfaces.ts";

const BASE_URL = 'http://localhost:3000'

export enum methodType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

type Params<T> = {
    method: methodType;
    url: string;
    data?: T; // Generic type for data
    headers?: Record<string, string>;
    queryParams?: Record<string, unknown>;
    timeout?: number; // Optional timeout
}

const makeRequest = async <TResponse, TData>(params: Params<TData>): Promise<IResponse<TResponse>> => {
    try {
        return await axios({
            baseURL: BASE_URL,
            method: params.method,
            url: params.url,
            data: params.data,
            headers: params.headers,
            params: params.queryParams,
            timeout: params.timeout || 10000, // Default timeout of 10 seconds
        });
    } catch (error: unknown) {
        // Handle the error
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};

export default makeRequest;
