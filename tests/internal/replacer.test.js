'use strict'

const $ = require('@nodewell/path')
const replacer = require($('@replacer'))
const readContent = require('../utils/readContent')

const content = {
  before: {
    valid: readContent($('@before/doc-with-valid-intradoc.md')),
    invalid: readContent($('@before/doc-with-invalid-intradoc.md')),
    multiple: readContent($('@before/doc-with-multiple-different-intradocs.md')),
    duplicate: readContent($('@before/doc-with-multiple-duplicate-intradocs.md'))
  },
  after: {
    valid: readContent($('@after/doc-with-valid-intradoc.md')),
    invalid: readContent($('@after/doc-with-invalid-intradoc.md')),
    multiple: readContent($('@after/doc-with-multiple-different-intradocs.md')),
    duplicate: readContent($('@after/doc-with-multiple-duplicate-intradocs.md'))
  }
}

const data = {
  API: '...new API documentation...',
  API_1: '...new API 1 documentation...',
  API_2: '...new API 2 documentation...'
}

test('is a function', () => {
  expect(replacer).toEqual(expect.any(Function))
})

test('called with empty content', () => {
  expect(replacer('', {})).toEqual('')
})

test('called with empty data', () => {
  expect(replacer('', {})).toEqual('')
})

test('called with valid intradoc', () => {
  expect(replacer(content.before.valid, data)).toStrictEqual(content.after.valid)
})

test('called with invalid intradoc', () => {
  expect(replacer(content.before.invalid, data)).toStrictEqual(content.after.invalid)
})

test('called with multiple, different intradocs', () => {
  expect(replacer(content.before.multiple, data)).toStrictEqual(content.after.multiple)
})

test('called with multiple duplicate intradocs', () => {
  expect(replacer(content.before.duplicate, data)).toStrictEqual(content.after.duplicate)
})

test('throws error, when the 1st argument is invalid', () => {
  expect(() => replacer())
    .toThrowError(new TypeError('1st argument \'content\' must be a string, got \'undefined\''))
})

test('throws error, when the 2nd argument is invalid', () => {
  expect(() => replacer(''))
    .toThrowError(new TypeError('2nd argument \'data\' must be a plain Object, got \'undefined\''))
})
