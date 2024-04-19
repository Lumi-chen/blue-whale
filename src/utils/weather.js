const weatherPhenomenaList = [
  { name: '晴', icon: 'sun' },
  { name: '云', icon: 'cloud' },
  { name: '阴', icon: 'yin' },
  { name: '风', icon: 'wind' },
  { name: '霾', icon: 'haze' },
  { name: '雨', icon: 'rain' },
  { name: '雪', icon: 'snow' },
  { name: '沙', icon: 'sand' },
  { name: '雾', icon: 'fog' },
  { name: '热', icon: 'hot' },
  { name: '冷', icon: 'cold' },
  { name: '未知', icon: 'unknown' },
]

export function getWeatherIcon(weather) {
  const data = weatherPhenomenaList.find(item => {
    return  weather.includes(item.name)
  })
  return data?.icon || 'unknown'
}