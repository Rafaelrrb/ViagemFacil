import { z } from 'zod'

export const estimateSchema = z
  .object({
    customer_id: z.string().min(1, { message: 'não pode ser vazio' }),
    origin: z.string().min(1, { message: 'não pode ser vazio' }),
    destination: z.string().min(1, { message: 'não pode ser vazio' })
  })
  .refine(data => data.origin !== data.destination, {
    message: 'Origem e destino não podem ser iguais',
    path: ['destination']
  })
