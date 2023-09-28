import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'jojo',
    email: 'jojo@teste.com',
    password: '123456789',
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'jojo@teste.com',
    password: '123456789',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
