import { Client } from '@googlemaps/google-maps-services-js'
import dotenv from 'dotenv'

dotenv.config()

const googleMapsClient = new Client({})

// const mockResponse = {
//   data: {
//     geocoded_waypoints: [
//       {
//         geocoder_status: 'OK',
//         place_id: 'ChIJL_P_CXMEDgARJxEQkmpgKB8',
//         types: ['locality', 'political']
//       },
//       {
//         geocoder_status: 'OK',
//         place_id: 'ChIJW-T2Wt7emwARdT3dVRv6iN4',
//         types: ['locality', 'political']
//       }
//     ],
//     routes: [
//       {
//         legs: [
//           {
//             distance: { text: '429 km', value: 429000 },
//             duration: { text: '5 hours 15 mins', value: 18900 },
//             end_address: 'Rio de Janeiro, RJ, Brazil',
//             end_location: { lat: -22.9068, lng: -43.1729 },
//             start_address: 'São Paulo, SP, Brazil',
//             start_location: { lat: -23.5505, lng: -46.6333 },
//             steps: [
//               {
//                 distance: { text: '100 km', value: 100000 },
//                 duration: { text: '1 hour 20 mins', value: 4800 },
//                 end_location: { lat: -22.8, lng: -43.2 },
//                 html_instructions: 'Continue on BR-101',
//                 polyline: { points: 'abcd1234' },
//                 start_location: { lat: -23.4, lng: -46.5 },
//                 travel_mode: 'DRIVING'
//               }
//             ]
//           }
//         ],
//         overview_polyline: { points: 'abcd1234efgh5678ijkl9101' },
//         summary: 'BR-116',
//         warnings: [],
//         waypoint_order: []
//       }
//     ],
//     status: 'OK'
//   }
// }

export const getRouteDetails = async (origin: string, destination: string) => {
  try {
    // Requisição para o Google Maps
    const response = await googleMapsClient.directions({
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_API_KEY!
      }
    })

    // const { routes } = mockResponse.data

    const { routes } = response.data

    // Pegando a distância, duração e origem/destino das informações da primeira rota
    const { legs } = routes[0]
    const { distance, duration, start_location, end_location } = legs[0]

    return {
      origin: {
        latitude: start_location.lat,
        longitude: start_location.lng
      },
      destination: {
        latitude: end_location.lat,
        longitude: end_location.lng
      },
      distance: distance.value / 1000,
      duration: duration.text,
      routeResponse: routes[0]
    }
  } catch (error) {
    throw new Error('Nenhuma rota encontrada')
  }
}
