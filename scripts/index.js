'use strict'

const { task, src, dest, series, parallel } = require('gulp')
const $ = require('@nodewell/path')

const generator = require('./vendors/zengulp/jsdoc-to-markdown')
const replacer = require('./vendors/zengulp/intradoc-replacer')

const plugin = '@richrdkng/dmd-plugin-simple-nodejs-project'

task('copy-files', async () => {
  src([
    $('@/README*'),
    $('@/LICENSE*'),
    $('@/src/**/*.js')
  ])
    .pipe(dest($('@/dist')))
})

task('build:docs:api', async () => {
  src($('@/src/index.js'))
    .pipe(generator({
      rename: 'API.md',
      plugin
    }))
    .pipe(dest($('@/docs')))
})

task('build:docs:readme', async () => {
  src($('@/README*'))
    .pipe(replacer({ __API: generator.fromFile($('@/src/index.js'), { plugin }) }))
    .pipe(dest($('@')))
})

task('build',
  series(
    'build:docs:readme',
    parallel(
      'copy-files',
      'build:docs:api'
    )
  )
)
