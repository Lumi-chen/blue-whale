import axios from 'axios'
const service = axios.create({
  baseURL: '/',
  timeout: 30000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
})

const pendingMap = new Map()

// 请求拦截器
service.interceptors.request.use((config) => {
  addPending(config)
  console.log(config, 'config')
  // 这里可以设置token: config!.headers!.Authorization = token
  return config
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // response && removePending(response.config)
    if (response.status === 200) {
      return response.data
    }
      return Promise.reject(response.data)

  },
  (err) => {
    return Promise.reject(err.response)
  }
)

export function request(method = 'GET', url = '', params = {}) {
  // if (pendingMap.size) removePending({method, url})
  return new Promise((resolve, reject) => {
    let promise
    console.log('request')
    if (method.toUpperCase() === 'GET') {
      promise = service({
        url,
        params
      })
    } else if (method.toUpperCase() === 'POST') {
      promise = service({
        method,
        url,
        data: params
      })
    }
    promise.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const getPendingUrl = ({method, url}) => {
  return [url, method].join('&')
}

const addPending = (config) => {
  const key = getPendingUrl(config)
  const controller = new AbortController()
  config.signal = controller.signal
  if (!pendingMap.has(key)) {
    pendingMap.set(key, controller)
  }
}

const removePending = (config) => {
  console.log('remove')
  const key = getPendingUrl(config)
  if (pendingMap.has(key)) {
    const abortController = pendingMap.get(key)
    if (abortController) {
      abortController.abort(key)
    }
    pendingMap.delete(key)
  }
}

export default service
