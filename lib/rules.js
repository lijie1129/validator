const T = require('./type.js')

const _isPassedRequired = val => {
  if (T.isNaN(val) || T.isUndefined(val) || T.isNull(val)) return false
  if ((T.isArray(val) || T.isObject(val) || T.isString(val)) && !Object.keys(val).length) return false
  return true
}

const operatorMapping = {
  '>=': (val, boundary) => val >= boundary,
  '<=': (val, boundary) => val <= boundary
}

// compare: Array、String、Number and Numeric String
const _compare = (val, boundary, operator) => (T.isString(val) || T.isArray(val))
  ? operatorMapping[operator](val && val.length, +boundary)
  : operatorMapping[operator](+val, +boundary)

module.exports = {
  string: T.isString,
  numericString: T.isNumericString,
  boolean: T.isBoolean,
  array: T.isArray,
  required: val => _isPassedRequired(val),
  max: (val, boundary) => _compare(val, boundary, '<='),
  min: (val, boundary) => _compare(val, boundary, '>=')
}
