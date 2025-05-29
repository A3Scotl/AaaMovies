import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import Auth from './pages/Auth.jsx'
import MovieInfo from './pages/MovieInfo'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/movies',
        element: <Movies />
      },
      {
        path: '/movie/:id',
        element: <MovieInfo />
      },
      {
        path: '/auth',
        element: <Auth />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)