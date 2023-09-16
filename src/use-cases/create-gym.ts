import { GymRepository } from '@/repositories/gym-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Gym, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface CreateGymUseCaseParams {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUseCaseParams): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      latitude,
      longitude,
      title,
      description,
      phone,
    })

    return {
      gym,
    }
  }
}
