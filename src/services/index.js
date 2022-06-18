import axios from 'axios'

const api = axios.create({
  baseURL:'https://api.sampleapis.com/coffee'
})


export default api