import { Request, Response } from 'express'
import { getRides } from '../services/getRidesService'

export const getRideController = async (req: Request, res: Response) => {
  try {
    const ride = await getRides(req)

    res.status(200).json(ride)
  } catch (error: any) {
    let errorStatus = 500
    let errorCode = ''
    let errorDescription = 'Não foi possivel encontrar viagens'

    if (error.message === 'INVALID_DRIVER') {
      errorStatus = 400
      errorCode = 'INVALID_DRIVER'
      errorDescription = 'Motorista invalido'
    }

    if (error.message === 'NO_RIDES_FOUND') {
      errorStatus = 404
      errorCode = 'NO_RIDES_FOUND'
      errorDescription = 'Nenhum registro encontrado'
    }

    res.status(errorStatus).json({
      error_code: errorCode,
      error_description: errorDescription
    })
  }
}
