require('raf/polyfill')
const { configure } = require('@ignota/susy.js')

configure({
  columns: [1, 3, 4, 12, 4, 3, 1],
  gutters: 1,
})

module.exports = require('./server')
