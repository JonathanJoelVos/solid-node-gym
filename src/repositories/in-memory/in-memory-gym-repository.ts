import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { GymRepository } from '../gym-repository'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async searchMany(query: string, page: number) {
    return this.items
      .filter((gym) => gym.title === query)
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      phone: data.phone ?? null,
      title: data.title,
    }
    this.items.push(gym)

    return gym
  }
}
