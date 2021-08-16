import axios from 'axios'

const getToken = () => {
  if (process.server) {
    return false
  }
  if (window.$nuxt) {
    return window.$nuxt.$auth.strategy.token.get()
  }
}

class HttpRequest {
  constructor(url = 'http://localhost:3000') {
    this.axios = axios
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 120000,
    })

    this.axiosInstance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        const token = getToken()
        if (token) {
          config.headers['Authorization'] = token
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.axiosInstance.interceptors.response.use(
      function (response) {
        // Do something with response data
        return response
      },
      function (error) {
        // Do something with response error
        return Promise.reject(error)
      }
    )
  }

  get(url, data) {
    return this.axiosInstance.get(url, {
      params: data,
    })
  }

  post(url, data) {
    return this.axiosInstance.post(url, data)
  }

  update(url, data) {
    return this.axiosInstance.put(url, data)
  }

  delete(url, param, data) {
    return this.axiosInstance.delete(url, {
      params: param,
      data,
    })
  }
}

export default HttpRequest
