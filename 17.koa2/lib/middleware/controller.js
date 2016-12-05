import fs from 'fs'
import path from 'path'
import Chain from '../pattern/Chain'
const router = require('koa-router')()

function addControllers (router) {
  fs.readdirSync(`${process.cwd()}/controllers`)
    .filter(f => {
      return f.endsWith('.js')
    })
    .forEach((f, index) => {
      console.log(`process controller: ${f}...`)
      const filePath = path.join(`${process.cwd()}/controllers/${f}`)
      console.log(filePath)
      let mapping = require(filePath)
      addMapping(router, mapping)
    })
}

function addMapping (router, mapping) {
  for (let url in mapping) {
    var get = new Chain(handleGET)
    var post = new Chain(handlePOST)
    var last = new Chain(handleLAST)
    get.setSuccessor(post)
    post.setSuccessor(last)
    get.passRequest(router, url, mapping[url])
  }
}

function handleGET (router, url, middleware) {
  if (url.startsWith('GET')) {
    var path = url.substring(4)
    router.get(path, middleware)
    console.log(`register URL mapping: GET ${path}`)
  } else {
    return 'nextSuccessor'
  }
}

function handlePOST(router, url, middleware) {
  if (url.startsWith('POST')) {
    var path = url.substring(5)
    router.post(path, middleware)
    console.log(`register URL mapping: POST ${path}`)
  } else {
    return 'nextSuccessor'
  }
}

function handleLAST (router, url, middleware) {
  console.log(`invalid url: ${url}`)
}

module.exports = (dir = `${process.cwd()}/controller` ) => {
  let ctrller_dir = dir || `${process.cwd()}/controller`
  addControllers(router, ctrller_dir)
  return router.routes()
}




