import axios from "../axios"

const handleLoginApi = (userUsername, userPassword) => {
    return axios.post("/api/login", { username: userUsername, password: userPassword})
}

const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data)
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

export { handleLoginApi, createNewUserService, getAllUser }
// export { handleLoginApi, createNewUserService}