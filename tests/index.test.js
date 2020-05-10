'use strict'

const stream = require('stream')
const es = require('event-stream')
const File = require('vinyl')

const main = require('../src')

test('is a function', () => {
  expect(main).toEqual(expect.any(Function))
})

test('processes the file in buffer mode', done => {
  const fakeFile = new File({
    contents: Buffer.from('<!--- <% API --->\n...old API documentation...\n<!--- API %> --->')
  })

  const replacer = main({ API: '...new API documentation...' })

  replacer.write(fakeFile)

  replacer.once('data', file => {
    expect(file.isBuffer()).toBe(true)
    expect(file.contents.toString('utf8'))
      .toStrictEqual('<!--- <% API --->\n...new API documentation...\n<!--- API %> --->')

    done()
  })
})

test('throws an error in streaming mode', () => {
  const fakeFile = new File({
    contents: new stream.Readable({ objectMode: true })
      .wrap(es.readArray(['<!--- <% API --->', '\n...old API documentation...\n', '<!--- API %> --->']))
  })

  const replacer = main({ API: '...new API documentation...' })

  expect(() => replacer.write(fakeFile))
    .toThrowError(new Error('@zengulp/intradoc-replacer: \'file\' must be a Buffer, Streaming not supported'))
})
