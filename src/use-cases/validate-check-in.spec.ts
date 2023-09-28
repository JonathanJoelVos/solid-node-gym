import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidadeCheckInUseCase } from './validate-check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidadeCheckInUseCase

describe('Validade check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidadeCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'teste',
      user_id: 'teste',
    })
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validate an inexistent check-in', async () => {
    await expect(async () => {
      await sut.execute({
        checkInId: 'inexistent id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('should not be able to validate the check-in after 20 minutes od its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'teste',
      user_id: 'teste',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    expect(async () => {
      await sut.execute({
        checkInId: createdCheckIn.id,
      })
    }).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
