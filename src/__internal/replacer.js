'use strict'

module.exports = (content, data) => {
  if (typeof content !== 'string') {
    throw new TypeError(`1st argument 'content' must be a string, got '${typeof content}'`)
  }

  if (Object.prototype.toString.call(data) !== '[object Object]') {
    throw new TypeError(`2nd argument 'data' must be a plain Object, got '${typeof data}'`)
  }

  return content.replace(
    /<!---\s*<%\s*([\w-.]+)\s*--->\n(.*?)\n?<!---\s*[\w-.]+\s*%>\s*--->/gsi,
    (fullMatch, key, content) => {
      if (key in data) {
        content = data[key]
      } else {
        return fullMatch
      }

      return `<!--- <% ${key} --->\n${content}\n<!--- ${key} %> --->`
    }
  )
}
