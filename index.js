const T = require('./lib/type.js')
const InvalidMessages = require('./lib/language.js')
const Rules = require('./lib/rules.js')
const get = require('lodash.get')

function validateSingleParamByMultipleRules (name, val, rulesString, allRules, allInvalidMsg, allParams) {
  let result = ''
  const rules = rulesString.split('|')

  for (let i = 0, len = rules.length; i < len; i++) {
    const rule = rules[i]
    const idxOfSeparator = rule.indexOf(':')
    let ruleName = rule
    let ruleValue = ''

    if (~idxOfSeparator) {
      ruleValue = rule.substr(idxOfSeparator + 1)

      ruleName = rule.substr(0, idxOfSeparator)
    }

    const fn = allInvalidMsg[ruleName + '']

    if (!allRules[ruleName](val, ruleValue, allParams)) {
      result = {
        paramName: name,
        actualValue: val,
        invalidMessage: fn(name, val, ruleValue)
      }

      break
    }
  }

  return result
}

/**
 *
 * return first invalid param info by default
 *   you can set inDepth true, get all invalid params info
 * return chinese invalid message by default
 *   you can set lang 'en', get English invalid message
 *
 */
function main (params, schema, options = {}) {
  const invalidParams = []

  if (!T.isObject(schema)) return invalidParams
  if (!T.isObject(params)) params = {}

  const needValidateParamNameList = Object.keys(schema)

  if (!needValidateParamNameList.length) return invalidParams

  const { language = 'zh', deep = false, extRules = {}, extInvalidMessages = {} } = options
  const allRules = Object.assign({}, Rules, extRules)
  const allInvalidMessages = Object.assign({}, InvalidMessages[language], extInvalidMessages)

  for (let i = 0, len = needValidateParamNameList.length; i < len; i++) {
    const name = needValidateParamNameList[i]
    const val = get(params, name)
    const rulesString = schema[name]

    if (!name || !rulesString || (T.isUndefined(val) && !rulesString.includes('required'))) continue

    const invalidInfo = validateSingleParamByMultipleRules(name, val, rulesString, allRules, allInvalidMessages, params)

    if (invalidInfo) {
      invalidParams.push(invalidInfo)

      if (!deep) break
    }
  }

  return invalidParams
}

module.exports = main
