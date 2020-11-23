export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
  // + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function isEmpty(obj) {
  try {
    if (obj == null || obj == undefined) {
      return true
    }
    //判断数字是否是NaN
    if (typeof obj === 'number') {
      if (isNaN(obj)) {
        return true
      } else {
        return false
      }
    }
    //判断参数是否是布尔、函数、日期、正则，是则返回false
    if (
      typeof obj === 'boolean' ||
      typeof obj === 'function' ||
      obj instanceof Date ||
      obj instanceof RegExp
    ) {
      return false
    }
    //判断参数是否是字符串，去空，如果长度为0则返回true
    if (typeof obj === 'string') {
      if (obj.trim().length == 0) {
        return true
      } else {
        return false
      }
    }

    if (typeof obj === 'object') {
      //判断参数是否是数组，数组为空则返回true
      if (obj instanceof Array) {
        if (obj.length == 0) {
          return true
        } else {
          return false
        }
      }

      //判断参数是否是对象，判断是否是空对象，是则返回true
      if (obj instanceof Object) {
        //判断对象属性个数
        if (Object.getOwnPropertyNames(obj).length == 0) {
          return true
        } else {
          return false
        }
      }
    }
  } catch (e) {
    console.log(e)
    return false
  }
}
