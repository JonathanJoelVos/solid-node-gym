import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validadeCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validadeCheckInParamsSchema.parse(request.params)

  const validateCheckIn = makeValidateCheckInUseCase()

  await validateCheckIn.execute({
    checkInId,
  })

  reply.status(204).send()
}
