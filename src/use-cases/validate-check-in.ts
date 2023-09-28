import { CheckInRepository } from '@/repositories/check-in-repository'
import { GymRepository } from '@/repositories/gym-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidadeCheckInUseCaseRequest {
  checkInId: string
}
interface ValidadeCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidadeCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidadeCheckInUseCaseRequest): Promise<ValidadeCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
