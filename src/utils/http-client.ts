import axios from "axios";

export const httpClient = axios.create({
    baseURL: "http://localhost:5041/api/v1",
    headers: {
        "Content-type": "application/json",
    },
});

export default httpClient;
