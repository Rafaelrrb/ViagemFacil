import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customer_id: '',
    origin: '',
    destination: ''
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:8080/ride/estimate',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      localStorage.setItem('rideData', JSON.stringify(response.data))
      navigate('/options')
    } catch (error) {
      console.error('Erro ao enviar os dados:', error)
    }
  }

  return (
    <div className="flex justify-center py-6">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 h-1/4 p-4 bg-gray-800 text-white rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">Buscar viagem</h2>
        <div className="mb-4">
          <label htmlFor="customerId" className="block text-gray-300">
            Seu ID
          </label>
          <input
            type="text"
            id="customerId"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded text-white placeholder-gray-400"
            placeholder="Digite seu ID"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="origin" className="block text-gray-300">
            Origem
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded text-white placeholder-gray-400"
            placeholder="Digite o local de partida"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-gray-300">
            Destino
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded text-white placeholder-gray-400"
            placeholder="Digite seu local de destino"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/4 bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Iniciar busca
          </button>
        </div>
      </form>
    </div>
  )
}
