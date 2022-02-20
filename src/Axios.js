import Axios from 'axios';

export const Axios = axios.create({
    baseURL: "http://localhost:3002",
    headers: { Auth: "Simple AUTH" }
});