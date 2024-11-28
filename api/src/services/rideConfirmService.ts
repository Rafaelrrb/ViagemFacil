import prisma from '../prisma/client'
import { temporaryRides } from '../utils/temporaryStorage'

interface confirmProps {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: {
    id: number
    name: string
  }
  value: number
}

export const confirmRide = async ({
  customer_id,
  origin,
  destination,
  distance,
  duration,
  driver,
  value
}: confirmProps) => {
  const dataRides = temporaryRides['dataRides']
  if (
    dataRides.options.find(
      (option: { id: number }) => option.id === driver.id
    ) === undefined
  ) {
    throw new Error('DRIVER_NOT_FOUND')
  }

  if (dataRides.distance != distance) {
    throw new Error('INVALID_DISTANCE')
  }

  await prisma.customer.update({
    where: { id: customer_id },
    data: {
      rides: {
        create: {
          origin,
          destination,
          distance,
          duration,
          driver: {
            connect: { id: driver.id }
          },
          value
        }
      }
    },
    include: {
      rides: true
    }
  })

  return {
    success: true
  }
}
