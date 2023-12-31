import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { userRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

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
