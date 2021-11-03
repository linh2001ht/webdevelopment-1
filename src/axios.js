import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    // timeout: 1000
})

instance.interceptors.response.use(
    (response) => {
        const { data } = response
        return response.data
    }
)

export default instance