export function dateTimeFormate(date = new Date(), formate) {
  const year = date.getFullYear()
  const fullMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const month = date.getMonth() + 1
  const fullDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const day = date.getDate()
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  switch(formate) {
    case 'yyyy-MM-dd hh:mm:ss':
      return `${year}-${fullMonth}-${fullDay} ${hour}:${min}:${sec}`
    case 'yyyy-MM-dd':
      return `${year}-${fullMonth}-${fullDay}`
    case 'yyyy-M-d':
      return `${year}-${month}-${day}`
    case 'yyyy':
      return year
    case 'hh:mm:ss':
      return `${hour}:${min}:${sec}`
    case 'set': 
      return {
        year: year,
        month: month,
        fullMonth: fullMonth,
        fullDay: fullDay,
        day: day,
        time: date.getTime()
      }
    default:
      return date.getTime()
  }
}

export function weekFormate(week) {
  const weekList = ['一','二','三','四','五','六','日']
  return weekList[Number(week) - 1]
}

