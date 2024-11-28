import axios from 'axios'
import { useState } from 'react'

const drivers = [
  { id: 1, name: 'Homer Simpson' },
  { id: 2, name: 'Dominic Toretto' },
  { id: 3, name: 'James Bond' }
]

export default function TravelHistory() {
  const [formData, setFormData] = useState({
    userId: '',
    driverId: 'all'
  })
  const [userRides, setUserRides] = useState<any>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url =
        formData.driverId !== 'all'
          ? `http://localhost:8080/ride/${formData.userId}?driver_id=${formData.driverId}`
          : `http://localhost:8080/ride/${formData.userId}`

      console.log(url)

      const response = await axios.get(url)

      setUserRides(response.data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      alert('Erro ao aplicar o filtro.')
    }
  }

  return (
    <div className="flex flex-col justify-center py-4">
      <div className="p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 items-center p-4 bg-gray-800 text-white rounded-lg shadow-lg"
        >
          <div className="flex-1">
            <label htmlFor="userId" className="block text-gray-300 mb-1">
              ID do Usuário
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded text-white placeholder-gray-400"
              placeholder="Digite o ID do usuário"
              required
            />
          </div>

          <div className="flex-1">
            <label htmlFor="driverId" className="block text-gray-300 mb-1">
              Selecione o Motorista
            </label>
            <select
              id="driverId"
              name="driverId"
              value={formData.driverId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded text-white"
            >
              <option value="all">Todos</option>
              {drivers.map(driver => (
                <option key={driver.id} value={driver.id.toString()}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-shrink-0">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Aplicar Filtro
            </button>
          </div>
        </form>
      </div>

      <div className="flex p-4">
        {userRides === null ? (
          <h1>Nenhuma viagem</h1>
        ) : (
          <>
            {userRides.rides.length === 0 ? (
              <p>Nenhuma viagem registrada.</p>
            ) : (
              <div className="flex flex-wrap gap-4 w-full">
                {userRides.rides.map((ride: any) => (
                  <div
                    key={ride.id}
                    className="w-full  sm:w-[250] md:w-[300] lg:w-[350px] xl:w-[400px] mb-6 p-4 border border-gray-300 rounded-lg bg-gray-800 text-white"
                  >
                    <h2 className="text-xl font-bold">Viagem {ride.id}</h2>

                    <p>
                      <strong>Data e Hora:</strong>{' '}
                      {new Date(ride.date).toLocaleString()}
                    </p>

                    <p>
                      <strong>Motorista:</strong> {ride.driver.name}
                    </p>

                    <p>
                      <strong>Origem:</strong> {ride.origin}
                    </p>
                    <p>
                      <strong>Destino:</strong> {ride.destination}
                    </p>

                    <p>
                      <strong>Distância:</strong> {ride.distance} km
                    </p>

                    <p>
                      <strong>Tempo:</strong> {ride.duration} minutos
                    </p>
                    <p>
                      <strong>Valor:</strong> R$ {ride.value.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
