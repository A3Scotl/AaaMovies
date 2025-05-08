import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <nav>
        <a href="/">Home</a> | <a href="/movies">Movies</a> | <a href="/auth">Auth</a>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App