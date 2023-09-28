import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { description, latitude, longitude, phone, title } =
    createGymBodySchema.parse(request.body)

  const createGym = makeCreateGymUseCase()

  await createGym.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  })

  reply.status(201).send()
}
