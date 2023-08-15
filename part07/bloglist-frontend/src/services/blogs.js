import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlogpost) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlogpost, config)
  return response.data
}

const update = async (id, changedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, changedBlog)
  return response.data
}

const removeOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (comment) => {
  const response = await axios.post(
    `${baseUrl}/${comment.blog}/comments`,
    comment
  )

  return response.data
}

export default { getAll, create, setToken, update, removeOne, addComment }
