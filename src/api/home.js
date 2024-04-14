import { request } from '@/utils/request'

export const gaodeGetAddress = (params) => {
  return request({
    method: 'get',
    url: 'https://restapi.amap.com/v3/ip',
    params,
  })
}

export const getWeatherInfo = (params) => {
  return request({
    method: 'get',
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    params,
  })
}

export const getScheduleList = (params) => {
  return {
    list: [
      { time: '08: 00', title: 'Morning Meeting', place: 'room A', key: 1},
      { time: '09: 00', title: 'Requirement explanation and Prototype explanation', place: 'room C', key: 2},
      { time: '13: 00', title: 'Technical selection', place: 'room C', key: 3},
      { time: '15: 00', title: 'Workload assessment', place: 'room B', key: 4},
      { time: '17: 00', title: 'Daily summary meeting', place: 'room A', key: 5}
    ]
  }
}