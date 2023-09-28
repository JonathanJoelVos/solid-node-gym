import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidadeCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new ValidadeCheckInUseCase(checkInRepository)

  return useCase
}
