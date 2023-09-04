global.regeneratorRuntime = require('regenerator-runtime/runtime')
const { configure } = require('@ignota/susy.js')

configure({
  columns: [1, 3, 4, 12, 4, 3, 1],
  gutters: 1,
})

require('./client')
