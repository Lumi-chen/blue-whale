export function dateTimeFormate(date = new Date(), formate = 'yyyy-MM-dd mm:ss') {
  const year = date.getFullYear()
  const fullMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const month = date.getMonth() + 1
  const fullDay = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
  const day = date.getDate()
  const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  switch(formate) {
    case 'yyyy-MM-dd mm:ss':
      return `${year}-${fullMonth}-${fullDay} ${min}:${sec}`
    case 'yyyy-MM-dd':
      return `${year}-${fullMonth}-${fullDay}`
    case 'yyyy-M-d':
      return `${year}-${month}-${day}`
    case 'yyyy':
      return year
    default:
      break
  }
}

export function weekFormate(week) {
  const weekList = ['一','二','三','四','五','六','日']
  return weekList[Number(week) - 1]
}