import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: verifyJwt }, profile)
}
