import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to external tool like DataDog
  }

  return reply.status(500).send()
})
