import axios, {AxiosError} from 'axios'

axios.interceptors.response.use(resp => {
  return resp
}, (err: Error | AxiosError) => {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401) {
      console.log('token is wrong')
    }
  return Promise.reject(err)
  }
  return Promise.reject(err)
})

export default axios