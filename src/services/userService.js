import axios from "../axios"

const handleLoginApi = (userUsername, userPassword) => {
    return axios.post("/api/login", { username: userUsername, password: userPassword})
}

const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data)
}

export { handleLoginApi, createNewUserService }