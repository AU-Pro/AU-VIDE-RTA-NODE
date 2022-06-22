/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-expressions */
const marked = require('marked')
const loaderUtils = require('loader-utils')

module.exports = (content) => {
  this.cacheable && this.cacheable()
  const options = loaderUtils.getOptions(this)
  try {
    marked.setOptions(options)
    return marked(content)
  } catch (error) {
    this.emitError(error)
    return null
  }
}
