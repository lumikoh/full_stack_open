import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY
const url = "https://api.openweathermap.org/data/2.5"

const getAll = (city) => {
    const response = axios.get(`${url}/weather?q=${city}&appid=${api_key}`)
    return response.then(response => response.data) 
}

export default {getAll}