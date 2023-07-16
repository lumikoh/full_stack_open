import axios from 'axios'
const personUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(personUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(personUrl, newPerson)
    return request.then(response => response.data)
}

export default {
    getAll,
    create
}