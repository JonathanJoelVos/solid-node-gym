import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsUseCase(gymRepository)
  })

  it('should be able fetch nearby gyms', async () => {
    gymRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    gymRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
