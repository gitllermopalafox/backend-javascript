const debug = require('debug')('platziverse:api')
const http = require('http')
const express = require('express')
const chalk = require('chalk')
const asyncify = require('express-asyncify')

const api = require('./api')

const port = process.env.PORT || 3000

// Dando soporte de async/awair
const app = asyncify(express())
const server = http.createServer(app)

// Middlewares
// Son funciones que se ejecutan antes de que la peticion llege a la ruta final
// Depende del orden en el cual se van agregando
app.use('/api', api)

// Express Error Handler
app.use((error, req, res, next) => {
  debug(`Error: ${error.message}`)
  if (error.message.match(/not found/)) {
    return res.status(404).send({ error: error.message })
  }

  res.status(500).send({ error: error.message })
})

function handleFatalError (error) {
  console.error(`${chalk.red('[fatal error]')} ${error.message}`)
  console.error(error.stack)
  process.exit(1)
}

// Si no se esta requiriendo el archivo
if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[platziverse-api]')} server listening on port ${port}`)
  })
}

module.exports = server
