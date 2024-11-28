import { z } from 'zod'
export const confirmSchema = z
  .object({
    customer_id: z.string().min(1, { message: 'não pode ser vazio' }),
    origin: z.string().min(1, { message: 'não pode ser vazio' }),
    destination: z.string().min(1, { message: 'não pode ser vazio' }),
    distance: z.number().min(1, { message: 'não pode ser vazio' }),
    duration: z.string().min(1, { message: 'não pode ser vazio' }),
    driver: z.object({
      id: z.number().min(1, { message: 'não pode ser vazio' }),
      name: z.string().min(1, { message: 'não pode ser vazio' })
    }),
    value: z.number().min(1, { message: 'não pode ser vazio' })
  })
  .refine(data => data.origin !== data.destination, {
    message: 'Origem e destino não podem ser iguais',
    path: ['destination']
  })
