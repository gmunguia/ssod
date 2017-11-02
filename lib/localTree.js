'use strict'

const fs = require('fs')
const Markdown = require('markdown-it')
const path = require('path')
const { assoc } = require('ramda')

const config = require('./config')

const md = Markdown()
  .use(require('markdown-it-confluence'))
  .use(require('markdown-it-plantuml'))

const createTree = dir => fs.readdirSync(dir)
  .filter(f => !config.ignore.includes(f))
  .map(f => ({
    name: f,
    path: path.resolve(dir, f)
  }))
  .map(f => assoc('stat', fs.statSync(f.path), f))
  .filter(({ stat }) => stat && (stat.isDirectory() || stat.isFile()))
  .map(f => assoc('type', f.stat.isDirectory() ? 'directory' : 'file', f))
  .map(f => assoc('children', f.type === 'file' ? [] : createTree(f.path), f))
  .map(f => f.type === 'directory' ? f : assoc('extension', path.extname(f.name), f))
  .filter(f => f.type === 'directory' || f.extension === '.md')
  .map(f => f.type === 'directory'
    ? f
    : assoc('content', md.render(fs.readFileSync(f.path, { encoding: 'UTF-8' })), f)
  )

const source = path.resolve(process.cwd(), config.source)

module.exports = {
  read: () => createTree(source)
}
