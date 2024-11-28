import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-lg font-bold">ViagemFacil</h1>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:underline">
              Solicitação de viagem
            </Link>
          </li>
          <li>
            <Link to="/options" className="hover:underline">
              Opções de viagem
            </Link>
          </li>
          <li>
            <Link to="/history" className="hover:underline">
              Histórico de viagens
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
