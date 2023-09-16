import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)

    gymRepository.create({
      id: 'gym-id',
      description: '',
      latitude: -27.5186504,
      longitude: -48.433939,
      phone: '',
      title: 'Jojo acad',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-is',
      userLatitude: -27.5186504,
      userLongitude: -48.433939,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 8, 10, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-01',
      userLatitude: -27.5186504,
      userLongitude: -48.433939,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-01',
        userLatitude: -27.5186504,
        userLongitude: -48.433939,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })
  it('should be able to check in twice in the different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 8, 10, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-01',
      userLatitude: -27.5186504,
      userLongitude: -48.433939,
    })

    vi.setSystemTime(new Date(2022, 0, 9, 10, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-01',
      userLatitude: -27.5186504,
      userLongitude: -48.433939,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distant gym', async () => {
    gymRepository.create({
      id: 'gym-id2',
      description: '',
      latitude: -27.5186504,
      longitude: -48.433939,
      phone: '',
      title: 'Jojo acad',
    })

    expect(async () => {
      await sut.execute({
        gymId: 'gym-id',
        userId: 'user-01',
        userLatitude: -27.5196824,
        userLongitude: -48.4399521,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
