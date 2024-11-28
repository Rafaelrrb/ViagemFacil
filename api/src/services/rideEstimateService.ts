import prisma from '../prisma/client'
import { Driver } from '@prisma/client'
import { temporaryRides } from '../utils/temporaryStorage'
import { getRouteDetails } from './googleMapsService'

interface estimateProps {
  customer_id: string
  origin: string
  destination: string
}

export const calculateRide = async ({
  customer_id,
  origin,
  destination
}: estimateProps) => {
  const routeDetails = await getRouteDetails(origin, destination)

  const availableDrivers = await prisma.driver.findMany({
    where: {
      kmMin: {
        lte: routeDetails.distance
      }
    },
    include: {
      reviews: true
    }
  })

  if (availableDrivers.length === 0) {
    throw new Error('Nenhum motorista disponível para a distância desejada')
  }

  const driversWithPrice = availableDrivers.map((driver: Driver) => ({
    ...driver,
    estimatedPrice: driver.value * routeDetails.distance
  }))

  const dataRides = {
    customer_id,
    origin: routeDetails.origin,
    destination: routeDetails.destination,
    distance: routeDetails.distance,
    duration: routeDetails.duration,
    options: driversWithPrice,
    routeResponse: routeDetails.routeResponse
  }

  temporaryRides['dataRides'] = dataRides

  return dataRides
}
