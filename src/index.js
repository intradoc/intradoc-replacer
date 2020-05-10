'use strict'

const tap = require('gulp-tap')
const replacer = require('./__internal/replacer')

module.exports = data =>
  tap(file => {
    if (file.isStream()) {
      throw new Error('@zengulp/intradoc-replacer: \'file\' must be a Buffer, Streaming not supported')
    }

    file.contents = Buffer.from(
      replacer(
        file.contents.toString('utf8'),
        data
      )
    )
  })
