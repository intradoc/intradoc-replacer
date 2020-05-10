'use strict'

const tap = require('gulp-tap')
const replacer = require('./__internal/replacer')

module.exports = data =>
  tap(file => {
    file.contents = Buffer.from(
      replacer(
        file.contents.toString(),
        data
      )
    )
  })
