import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Jojo gym',
        description: 'academia legal',
        phone: '96216534',
        latitude: -27.5186504,
        longitude: -48.433939,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Mica gym',
        description: 'academia legal',
        phone: '96216534',
        latitude: -27.5186504,
        longitude: -48.433939,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        q: 'Mica',
        page: 1,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Mica gym',
      }),
    ])
  })
})
