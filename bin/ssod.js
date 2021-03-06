'use strict'

const chalk = require('chalk')
const confluenceTree = require('../lib/confluenceTree')
const localTree = require('../lib/localTree')
const log = require('../lib/logger')

log.info('-----------------------------------------')
log.info('-----------------------------------------')
log.info(chalk.cyan('@#$%^&*&^%$#$%^&*   SSOD   @#&%^$%#@$^#&%'))
log.info('-----------------------------------------')
log.info('-----------------------------------------')
confluenceTree.delete()
  .then(() => confluenceTree.create(localTree.read()))
  .then(() => log.info('-----------------------------------------'))
  .then(() => log.info(chalk.green('@#$%^&*&^%$#$%^&*   Done!  @#&%^$%#@$^#&%')))
  .then(() => log.info('-----------------------------------------'))
  .catch(e => log.error(chalk.red(e)))
