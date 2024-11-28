import { Request, Response } from 'express'
import { confirmRide } from '../services/rideConfirmService'

export const confirmRideController = async (req: Request, res: Response) => {
  try {
    const ride = await confirmRide(req.body)

    res.status(200).json(ride)
  } catch (error: any) {
    let errorStatus = 500
    let errorCode = ''
    let errorDescription = 'Não foi possivel confirmar a viagem'

    if (error.message === 'DRIVER_NOT_FOUND') {
      errorStatus = 404
      errorCode = 'DRIVER_NOT_FOUND'
      errorDescription = 'Motorista não encontrado'
    }

    if (error.message === 'INVALID_DISTANCE') {
      errorStatus = 406
      errorCode = 'INVALID_DISTANCE'
      errorDescription = 'Quilometragem inválida para o motorista'
    }

    res.status(errorStatus).json({
      error_code: errorCode,
      error_description: errorDescription
    })
  }
}
