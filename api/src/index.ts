import express from 'express'
import rideRoutes from './routes/rideRoutes'
const cors = require('cors')

const app = express()
const PORT = 8080

app.use(
  cors({
    origin: 'http://localhost:80', // Frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
  })
)

app.use(express.json())
app.use('/ride', rideRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`)
})
