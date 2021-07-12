import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (newObject, blogId) => {
  const config = { headers: { Authorization: token } }
  const url = baseUrl + '/' + blogId

  const response = await axios.put(url, newObject, config)
  return response.data
}

const deleteId = async (blogId) => {
  const config = { headers: { Authorization: token } }
  const url = baseUrl + '/' + blogId

  try {
    await axios.delete(url, config)
    return true
  } catch (exception) {
    console.log(exception.message)
    return exception.message
  }
}

export default { setToken, getAll, create, like, deleteId }
