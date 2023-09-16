import { GymRepository } from '@/repositories/gym-repository'
import { Gym } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    page,
    query,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
