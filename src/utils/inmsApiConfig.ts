import axios from 'axios'

const inmsApiConfig = axios.create({
  baseURL: 'http://localhost:8080/inms-api' // Replace with your API's base URL
})

// Set up the Authorization header for every request
inmsApiConfig.interceptors.request.use(
  config => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlbnN6YUBnbWFpbC5jb20iLCJleHAiOjE2OTY5MjE5NjQsInJvbGVfaWQiOiIxIiwidXNlcmlkIjoiMzExMiIsInVzZXJuYW1lIjoiZ2Vuc3phQGdtYWlsLmNvbSJ9.QEPEwsKa2eaxNxYdPOgLpPiZ8U42OIUV_YDyQEzsfx8' // You might get this from a state, AsyncStorage, cookie, etc.
    if (token) {
      config.headers['Authorization'] = `${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default inmsApiConfig
