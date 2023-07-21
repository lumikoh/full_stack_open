const logger = require('./logger')
const morgan = require('morgan')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :content',
  { skip: () => process.env.NODE_ENV === 'test' }
)

morgan.token('content', (request) => {
  return JSON.stringify(request.body)
})

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}