import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://13.217.103.47:8000'

const api = axios.create({
  baseURL: API_URL
})

export default api
