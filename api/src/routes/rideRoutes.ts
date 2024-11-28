import express from 'express'
import { calculateRideController } from '../controllers/rideEstimateController'
import { estimateSchema } from '../schemas/estimateSchema'
import { validate } from '../middlewares/validationMiddleware'
import { confirmSchema } from '../schemas/confirmSchema'
import { confirmRideController } from '../controllers/rideConfirmController'
import { getRideController } from '../controllers/getRidesController'

const router = express.Router()

router.post('/estimate', validate(estimateSchema), calculateRideController)

router.patch('/confirm', validate(confirmSchema), confirmRideController)

router.get('/:customer_id', getRideController)

router.get('/', (req, res) => {
  res.status(404).json({
    error_code: 'NO_RIDES_FOUND',
    error_description: 'Nenhum registro encontrado'
  })
})

export default router
