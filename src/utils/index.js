/**
 *
 * @param {function} func
 * @param {number} delay
 */
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 *
 * @param {object} obj
 * @returns {object}
 */
export function deepClone(obj) {
  const newObj = Array.isArray(obj) ? [] : {}
  for(let key in obj) {
    if(obj[key] instanceof Object) {
      newObj[key] =  deepClone(obj[key])
    }else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
