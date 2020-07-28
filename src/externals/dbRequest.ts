import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Config from './config';

const axiosRequestConfig: AxiosRequestConfig = {
    baseURL: Config.getBackendURL()
};

export default class dbRequest {

    public static getBlog(title: string): Promise<string> {

        return axios.get<string>(`/api/getBlog/${title}`, axiosRequestConfig)
        .then((response: AxiosResponse<string>) => {
            return response.data;
        })
        .catch((error: AxiosError<string>) => {
            return "Failed to get blog post. \n\n" + error.message;
        });
    }
}