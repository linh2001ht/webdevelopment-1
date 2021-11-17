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

const editUserService = (inputData) => {
    return axios.put("/api/edit-user", inputData)
}

export { handleLoginApi, createNewUserService, getAllUser, editUserService }
// export { handleLoginApi, createNewUserService}