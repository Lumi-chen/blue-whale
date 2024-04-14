import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  timeout: 30000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
})
service.interceptors.request.use((config) => {
  // 这里可以设置token: config!.headers!.Authorization = token
  return config
})
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
      return Promise.reject(response.data)

  },
  (err) => {
    return Promise.reject(err.response)
  }
)

export function request({ method = 'POST', url, params = {} }) {
  console.log(method, params)
  if (method.toLowerCase() === 'get') {
    return service(url, {
      params: params,
    })
  } else if (method.toLowerCase() === 'post') {
    return service.post(url, params)
  }
}

export default service
