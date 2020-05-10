'use strict'

/**
 * @module @zengulp/intradoc-replacer
 */

const tap = require('gulp-tap')
const replacer = require('./__internal/replacer')

/**
 * Processes files with intradoc templates.
 *
 * @param {Object} data - The data as a plain Object to replace the intradoc templates with.
 *
 * @returns {NodeJS.ReadWriteStream} The processed file stream.
 */
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
