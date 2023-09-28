import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to regiseter', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'jojo',
      email: 'jojo@teste.com',
      password: '123456789',
    })

    expect(response.statusCode).toEqual(201)
  })
})
