import { Request, Response } from 'express'
import prisma from '../prisma/client'

export const getRides = async (req: Request) => {
  const customerId = req.params.customer_id

  const driverId = Number(req.query.driver_id)

  if (driverId) {
    const driverExists = await prisma.driver.findUnique({
      where: {
        id: driverId
      }
    })

    if (!driverExists) {
      throw new Error('INVALID_DRIVER')
    }
  }

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId
    },
    include: {
      rides: driverId
        ? {
            where: { driverId: driverId },
            include: {
              driver: {
                select: {
                  name: true
                }
              }
            }
          }
        : {
            include: {
              driver: {
                select: {
                  name: true
                }
              }
            }
          }
    }
  })

  if (!customer) {
    throw new Error('NO_RIDES_FOUND')
  }

  return customer
}
