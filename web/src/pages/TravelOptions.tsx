import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TravelOptions() {
  const navigate = useNavigate()
  const [rideData, setRideData] = useState<any | null>(null)

  useEffect(() => {
    const storedRideData = JSON.parse(
      localStorage.getItem('rideData') || 'null'
    )
    setRideData(storedRideData)
  }, [])

  if (!rideData) {
    return <p>Carregando opções de viagem...</p>
  }

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${rideData.origin.latitude},${rideData.origin.longitude}&zoom=6&size=600x300&markers=color:red%7Clabel:A%7C${rideData.origin.latitude},${rideData.origin.longitude}&markers=color:blue%7Clabel:B%7C${rideData.destination.latitude},${rideData.destination.longitude}&path=color:0x0000ff|weight:5|${rideData.origin.latitude},${rideData.origin.longitude}|${rideData.destination.latitude},${rideData.destination.longitude}&key=${process.env.GOOGLE_API_KEY}`

  const handleClick = async (driver: any) => {
    try {
      const data = {
        customer_id: rideData.customer_id,
        origin: rideData.routeResponse.legs[0].start_address,
        destination: rideData.routeResponse.legs[0].end_address,
        distance: rideData.distance,
        duration: rideData.duration,
        driver: {
          id: driver.id,
          name: driver.name
        },
        value: driver.estimatedPrice
      }

      await axios.patch('http://localhost:8080/ride/confirm', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      localStorage.removeItem('rideData')
      navigate('/history')
    } catch (error) {
      console.error('Erro ao enviar os dados:', error)
    }
  }

  return (
    <div className="py-4">
      <div className="flex flex-col items-center bg-gray-800 p-4">
        <h2 className="text-white text-2xl font-bold mb-4">Mapa com a Rota</h2>
        <img src={mapUrl} alt="Mapa da Rota" className="rounded-lg shadow-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {rideData.options.map((driver: any) => (
          <div
            key={driver.id}
            className="bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <h2 className="text-lg font-bold">{driver.name}</h2>
            <p className="text-gray-300">{driver.description}</p>
            <p>
              <strong>Veículo:</strong> {driver.vehicle}
            </p>

            {driver.reviews.map((review: any, index: any) => (
              <div key={index} className="mb-2">
                <strong>Avaliações: </strong>
                <span>{review.rating}/5⭐</span>
                {review.comment && (
                  <div>
                    <strong>Comentário:</strong> {review.comment}
                  </div>
                )}
              </div>
            ))}

            <p>
              <strong>Preço:</strong> R$ {driver.estimatedPrice.toFixed(2)}
            </p>

            <div className="flex justify-center p-2">
              <button
                type="button"
                className="w-3/4 bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
                onClick={() => handleClick(driver)}
              >
                Escolher
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
