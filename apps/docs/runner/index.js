const metaCollector = require('../utils/metaCollector.js')
// import metaReplacer from '../utils/metaReplacer'
const debug = require('debug')
const log = debug('@pq:runner')

const runner = async () => {
  try {
    log('Running scripts...')
    metaCollector()
    // metaReplacer()
  } catch (err) {
    console.log('Runner error:', err)
  }
}

module.exports = runner