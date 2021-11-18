import axios from "axios";

const instance = axios.create({
    baseURL: "https://obstacle-crossed-backend.herokuapp.com/",
})

instance.interceptors.response.use(
    (response) => {
        const { data } = response
        return response.data
    }
)

export default instance
// https://obstacle-crossed-backend.herokuapp.com/