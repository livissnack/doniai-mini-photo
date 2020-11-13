const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
  // + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getWeekDay = (dateString) => {
  console.log(dateString)
  let dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/

  if (dateString.match(dateStringReg)) {
    let presentDate = new Date(dateString),
      today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7

    return Array.from(new Array(7), function (val, index) {
      return formatDate(
        new Date(
          presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000
        )
      )
    })
  } else {
    throw new Error('dateString should be like "yyyy-mm-dd" or "yyyy/mm/dd"')
  }

  function formatDate(date) {
    return date.getDate()
  }
}

module.exports = {
  formatTime: formatTime,
  getWeekDay: getWeekDay
}
