import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const createGymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Jojo gym',
        description: 'academia legal',
        phone: '96216534',
        latitude: -27.5186504,
        longitude: -48.433939,
      })

    expect(createGymResponse.statusCode).toEqual(201)
  })
})
