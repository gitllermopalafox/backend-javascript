'use restrict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

// Creando objeto para realizar preguntas
const prompt = inquirer.createPromptModule()

async function setup () {
  // Realizando la pregunta por consola
  const answere = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  // Validando la respuesta del usuario
  if (!answere.setup) {
    return console.log('Nothing happened!')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'desarrollo',
    password: process.env.DB_PASS || 'desarrollo',
    host: process.env.Db_HOST || '192.168.1.9',
    dialect: 'postgres',
    logging: message => debug(message),
    // Para ejecutar el setup
    setup: true
  }

  await db(config).catch(handlerFatalError)

  console.log('Success')
  process.exit(0)
}

// Manejando el error
function handlerFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()