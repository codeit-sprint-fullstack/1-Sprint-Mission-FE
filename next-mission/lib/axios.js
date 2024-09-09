import axios from "axios";

const instance = axios.create({
    baseURL:'https://one-sprint-mission-be-5h16.onrender.com'
})

export default instance