function _isType (arg, type) {
  return Object.prototype.toString.call(arg) === `[object ${type}]`
}

module.exports = {
  isString: arg => _isType(arg, 'String'),
  isBoolean: arg => _isType(arg, 'Boolean'),
  isArray: arg => _isType(arg, 'Array'),
  isObject: arg => _isType(arg, 'Object'),
  isNaN: arg => Number.isNaN(arg),
  isNull: arg => _isType(arg, 'Null'),
  isUndefined: arg => _isType(arg, 'Undefined'),
  isNumericString: arg => _isType(+arg, 'Number') && !Number.isNaN(+arg)
}
