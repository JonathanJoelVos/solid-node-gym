import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })
  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      latitude: 0,
      longitude: 0,
      title: `jojo academy`,
    })

    await gymsRepository.create({
      latitude: 0,
      longitude: 0,
      title: `mica academy`,
    })

    const { gyms } = await sut.execute({
      query: 'jojo',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'jojo academy',
      }),
    ])
  })
  it('should be able fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        latitude: 0,
        longitude: 0,
        title: `jojo gym-${i}`,
      })
    }

    const { gyms } = await sut.execute({
      query: 'jojo',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'jojo gym-21',
      }),
      expect.objectContaining({
        title: 'jojo gym-22',
      }),
    ])
  })
})
