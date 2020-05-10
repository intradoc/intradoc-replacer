'use strict'

const pattern = /(<!---\s*<%\s*)([\w.]+)(\s*--->\n)(.*)(\n?<!---\s*)([\w.]+)(\s*%>\s*--->)/gis

module.exports = (string, data) =>
  string.replace(
    pattern,
    (fullMatch, openA, key, openB, content, closeA, _, closeB) => {
      if (key in data) {
        content = data[key]
      } else {
        return fullMatch
      }

      return openA + key + openB + content + closeA + key + closeB
    }
  )
