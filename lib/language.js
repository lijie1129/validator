const invalidMsgEn = {
  string: (paramName, actualValue) => `${paramName} is not string, ${actualValue} given.`,
  numericString: (paramName, actualValue) => `${paramName} is not numeric string, ${actualValue} given.`,
  boolean: (paramName, actualValue) => `${paramName} is not boolean, ${actualValue} given.`,
  array: (paramName, actualValue) => `${paramName} is not array, ${actualValue} given.`,
  required: (paramName, actualValue) => `Must pass ${paramName}, and the value cannot be: null, undefined, NaN, empty string, empty array, empty object`,
  max: (paramName, actualValue, boundary) => `${paramName} length or size cannot be greater than ${boundary}. actual value is: ${actualValue}`,
  min: (paramName, actualValue, boundary) => `${paramName} length or size cannot be less than ${boundary}. actual value is: ${actualValue}`
}

const invalidMsgZh = {
  string: (paramName, actualValue) => `${paramName} 必须为字符串类型, 实际值为：${actualValue}`,
  numericString: (paramName, actualValue) => `${paramName} 必须为数字, 实际值为：${actualValue}`,
  boolean: (paramName, actualValue) => `${paramName} 必须为布尔类型, 实际值为：${actualValue}`,
  array: (paramName, actualValue) => `${paramName} 必须为数组, 实际值为：${actualValue}`,
  required: (paramName, actualValue) => `必须传递 ${paramName}, 且值不能为: null, undefined, NaN, 空字符串, 空数组, 空对象`,
  max: (paramName, actualValue, boundary) => `${paramName} 的长度或大小不能大于 ${boundary}. 实际值为：${actualValue}`,
  min: (paramName, actualValue, boundary) => `${paramName} 的长度或大小不能小于 ${boundary}. 实际值为：${actualValue}`
}

module.exports = {
  zh: invalidMsgZh,
  en: invalidMsgEn
}
