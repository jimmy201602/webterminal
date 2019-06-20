import axios from 'axios'

export default {
  getAll (request = {}) {
    return axios.get('http://localhost:3000/products', request)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
