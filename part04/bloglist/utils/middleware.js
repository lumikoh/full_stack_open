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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
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

const tokenExtractor = (request, response, next) => {
  const auth = request.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    request.token = auth.replace('Bearer ', '')
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}