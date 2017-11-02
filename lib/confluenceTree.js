'use strict'

const Confluence = require('confluence-api')
const { map, pick } = require('ramda')

const config = require('./config')
const log = require('./logger')

const confluence = new Confluence(pick([ 'username', 'password', 'baseUrl' ], config.confluence))

const getChildren = id => new Promise((resolve, reject) => {
  confluence.getCustomContentById(
    { id, expanders: ['children.page'] },
    (err, content) => { err ? reject(err) : resolve(content.children.page.results) }
  )
})

const deleteContent = id => new Promise((resolve, reject) => {
  log.info('deleting', id)
  confluence.deleteContent(id, (err) => { err ? reject(err) : resolve() })
})

const postContent = (title, content, parentId) => new Promise((resolve, reject) => {
  log.info('creating', title)
  confluence.postContent(
    config.confluence.spaceKey,
    title,
    content,
    parentId,
    (err, response) => { err ? reject(err) : resolve(response) }
  )
})

const postTreeContent = (id, trees) => {
  const recPostTreeContent = id => tree =>
    postContent(tree.name, tree.type === 'file' ? tree.content : `<p>${tree.name}</p>`, id)
      .then(({ id }) => recPostTreeContent(id))
      .then(post => tree.children.map(post))
      .then(posting => Promise.all(posting))

  return Promise.all(trees.map(recPostTreeContent(id)))
}

const deleteTreeContent = id => getChildren(id)
  .then(map(c => c.id))
  .then(map(deleteContent))
  .then(deleting => Promise.all(deleting))
  .then(results => results.length > 0 ? deleteTreeContent(id) : Promise.resolve())

module.exports = {
  delete: () => deleteTreeContent(config.confluence.rootPage),
  create: tree => postTreeContent(config.confluence.rootPage, tree)
}
