import { Request, Response } from 'express'
import { calculateRide } from '../services/rideEstimateService'

export const calculateRideController = async (req: Request, res: Response) => {
  try {
    const ride = await calculateRide(req.body)
    res.status(200).json(ride)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}
