import { Outlet, useNavigate } from 'react-router-dom'

export default function PublicLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">📝 Diditodo</h1>
        <button
          onClick={() => navigate('/add')}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Add Todo
        </button>
      </nav>

      {/* Contenu */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
