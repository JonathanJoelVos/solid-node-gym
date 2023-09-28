import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to regiseter', async () => {
    await request(app.server).post('/users').send({
      name: 'jojo',
      email: 'jojo@teste.com',
      password: '123456789',
    })

    const response = await request(app.server).post('/session').send({
      email: 'jojo@teste.com',
      password: '123456789',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
