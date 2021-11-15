import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8081",
    // headers: {
    //     'Content-Type': 'application/json'
    // }
    // timeout: 1000
})

// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

instance.interceptors.response.use(
    (response) => {
        const { data } = response
        return response.data
    }
)

export default instance