const V = require('../index.js')

test('invalid value of params or schema or both', () => {
  expect(V({ name: 'jarone' })).toEqual([])
  expect(V({ name: 'jarone' }, 0)).toEqual([])
  expect(V({ name: 'jarone' }, false)).toEqual([])
  expect(V({ name: 'jarone' }, '')).toEqual([])
  expect(V({ name: 'jarone' }, 123)).toEqual([])
  expect(V({ name: 'jarone' }, 'abc')).toEqual([])
  expect(V({ name: 'jarone' }, [])).toEqual([])
  expect(V({ name: 'jarone' }, {})).toEqual([])
  expect(V({ name: 'jarone' }, () => {})).toEqual([])
  expect(V({ name: 'jarone' }, Promise.resolve())).toEqual([])
  expect(V({ name: 'jarone' }, new Error())).toEqual([])
  expect(V({ name: 'jarone' }, new Date())).toEqual([])

  expect(V(undefined, { name: 'max:10' })).toEqual([])
  expect(V(0, { name: 'max:10' })).toEqual([])
  expect(V(false, { name: 'max:10' })).toEqual([])
  expect(V('', { name: 'max:10' })).toEqual([])
  expect(V(123, { name: 'max:10' })).toEqual([])
  expect(V('abc', { name: 'max:10' })).toEqual([])
  expect(V([], { name: 'max:10' })).toEqual([])
  expect(V({}, { name: 'max:10' })).toEqual([])
  expect(V(() => {}, { name: 'max:10' })).toEqual([])
  expect(V(Promise.resolve(), { name: 'max:10' })).toEqual([])
  expect(V(new Error(), { name: 'max:10' })).toEqual([])
  expect(V(new Date(), { name: 'max:10' })).toEqual([])

  expect(V()).toEqual([])
  expect(V(0, 0)).toEqual([])
  expect(V(false, false)).toEqual([])
  expect(V('', '')).toEqual([])
  expect(V(123, 123)).toEqual([])
  expect(V('abc', 'abc')).toEqual([])
  expect(V([], [])).toEqual([])
  expect(V({}, {})).toEqual([])
  expect(V(() => {}, () => {})).toEqual([])
  expect(V(Promise.resolve(), Promise.resolve())).toEqual([])
  expect(V(new Error(), new Error())).toEqual([])
})

test('RULE: string', () => {
  expect(V({ foo: { name: 'jarone' } }, { 'foo.name': 'string' })).toEqual([])
  expect(V({ foo: { name: 1 } }, { 'foo.name': 'string' })).toEqual([{
    paramName: 'foo.name',
    actualValue: 1,
    invalidMessage: 'foo.name 必须为字符串类型, 实际值为：1'
  }])
  expect(V({ foo: { name: 1 } }, { 'foo.name': 'string' }, { language: 'en' })).toEqual([{
    paramName: 'foo.name',
    actualValue: 1,
    invalidMessage: 'foo.name is not string, 1 given.'
  }])
})

test('RULE: numericString', () => {
  expect(V({ age: '1' }, { age: 'numericString' })).toEqual([])
  expect(V({ age: 'one' }, { age: 'numericString' })).toEqual([{
    paramName: 'age',
    actualValue: 'one',
    invalidMessage: 'age 必须为数字, 实际值为：one'
  }])
  expect(V({ age: 'one' }, { age: 'numericString' }, { language: 'en' })).toEqual([{
    paramName: 'age',
    actualValue: 'one',
    invalidMessage: 'age is not numeric string, one given.'
  }])
})

test('RULE: boolean', () => {
  expect(V({ ok: false }, { ok: 'boolean' })).toEqual([])
  expect(V({ ok: 1 }, { ok: 'boolean' })).toEqual([{
    paramName: 'ok',
    actualValue: 1,
    invalidMessage: 'ok 必须为布尔类型, 实际值为：1'
  }])
  expect(V({ ok: 1 }, { ok: 'boolean' }, { language: 'en' })).toEqual([{
    paramName: 'ok',
    actualValue: 1,
    invalidMessage: 'ok is not boolean, 1 given.'
  }])
})

test('RULE: array', () => {
  expect(V({ records: [1, 2] }, { records: 'array' })).toEqual([])
  expect(V({ records: 1 }, { records: 'array' })).toEqual([{
    paramName: 'records',
    actualValue: 1,
    invalidMessage: 'records 必须为数组, 实际值为：1'
  }])
  expect(V({ records: 1 }, { records: 'array' }, { language: 'en' })).toEqual([{
    paramName: 'records',
    actualValue: 1,
    invalidMessage: 'records is not array, 1 given.'
  }])
})

test('RULE: required', () => {
  expect(V({ name: 'jarone' }, { name: 'required' })).toEqual([])
  expect(V({}, { name: 'required' })).toEqual([{
    paramName: 'name',
    actualValue: undefined,
    invalidMessage: '必须传递 name, 且值不能为: null, undefined, NaN, 空字符串, 空数组, 空对象'
  }])
  expect(V({ name: null }, { name: 'required' })).toEqual([{
    paramName: 'name',
    actualValue: null,
    invalidMessage: '必须传递 name, 且值不能为: null, undefined, NaN, 空字符串, 空数组, 空对象'
  }])
  expect(V({ name: '' }, { name: 'required' })).toEqual([{
    paramName: 'name',
    actualValue: '',
    invalidMessage: '必须传递 name, 且值不能为: null, undefined, NaN, 空字符串, 空数组, 空对象'
  }])
  expect(V({ name: [] }, { name: 'required' })).toEqual([{
    paramName: 'name',
    actualValue: [],
    invalidMessage: '必须传递 name, 且值不能为: null, undefined, NaN, 空字符串, 空数组, 空对象'
  }])
  expect(V({ name: {} }, { name: 'required' })).toEqual([{
    paramName: 'name',
    actualValue: {},
    invalidMessage: '必须传递 name, 且值不能为: null, undefined, NaN, 空字符串, 空数组, 空对象'
  }])
  expect(V({ name: {} }, { name: 'required' }, { language: 'en' })).toEqual([{
    paramName: 'name',
    actualValue: {},
    invalidMessage: 'Must pass name, and the value cannot be: null, undefined, NaN, empty string, empty array, empty object'
  }])
})

test('RULE: max', () => {
  expect(V({ name: 'jarone' }, { name: 'max:10' })).toEqual([])
  expect(V({ name: 'hello world' }, { name: 'max:10' })).toEqual([{
    paramName: 'name',
    actualValue: 'hello world',
    invalidMessage: 'name 的长度或大小不能大于 10. 实际值为：hello world'
  }])
  expect(V({ name: 'hello world' }, { name: 'max:10' }, { language: 'en' })).toEqual([{
    paramName: 'name',
    actualValue: 'hello world',
    invalidMessage: 'name length or size cannot be greater than 10. actual value is: hello world'
  }])
})

test('RULE: min', () => {
  expect(V({ name: 'hello world' }, { name: 'min:10' })).toEqual([])
  expect(V({ name: 'jarone' }, { name: 'min:10' })).toEqual([{
    paramName: 'name',
    actualValue: 'jarone',
    invalidMessage: 'name 的长度或大小不能小于 10. 实际值为：jarone'
  }])
  expect(V({ name: 'jarone' }, { name: 'min:10' }, { language: 'en' })).toEqual([{
    paramName: 'name',
    actualValue: 'jarone',
    invalidMessage: 'name length or size cannot be less than 10. actual value is: jarone'
  }])
})

test('OPTIONS: deep', () => {
  expect(V({ name: 'hello world', age: 18 }, { name: 'min:10', age: 'max:18' }, { deep: true })).toEqual([])
  expect(V({ name: 'jarone', age: 28 }, { name: 'min:10', age: 'max:18' }, { deep: true })).toEqual([
    {
      paramName: 'name',
      actualValue: 'jarone',
      invalidMessage: 'name 的长度或大小不能小于 10. 实际值为：jarone'
    },
    {
      paramName: 'age',
      actualValue: 28,
      invalidMessage: 'age 的长度或大小不能大于 18. 实际值为：28'
    }
  ])
  expect(V({ name: 'jarone', age: 28 }, { name: 'min:10', age: 'max:18' }, { deep: true, language: 'en' })).toEqual([
    {
      paramName: 'name',
      actualValue: 'jarone',
      invalidMessage: 'name length or size cannot be less than 10. actual value is: jarone'
    },
    {
      paramName: 'age',
      actualValue: 28,
      invalidMessage: 'age length or size cannot be greater than 18. actual value is: 28'
    }
  ])
})

test('extend rules', () => {
  expect(
    V(
      { name: 'jarone' },
      { name: 'isJarone' },
      {
        language: 'en',
        extRules: { isJarone: (val) => val === 'jarone' },
        extInvalidMessages: { isJarone: (paramName, val) => `${paramName} is not jarone, ${val} given.` }
      }
    )).toEqual([])

  expect(
    V(
      { name: 'luy' },
      { name: 'isJarone' },
      {
        language: 'en',
        extRules: { isJarone: (val) => val === 'jarone' },
        extInvalidMessages: { isJarone: (paramName, val) => `${paramName} is not jarone, ${val} given.` }
      }
    )).toEqual([{
    paramName: 'name',
    actualValue: 'luy',
    invalidMessage: 'name is not jarone, luy given.'
  }])
})
