import axios from "../axios"

const handleLoginApi = (userUsername, userPassword) => {
    return axios.post("/api/login", { username: userUsername, password: userPassword})
}

export { handleLoginApi }