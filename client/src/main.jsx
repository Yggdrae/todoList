import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Register from './routes/Register.jsx'
import Login from './routes/Login.jsx'
import List from './routes/List.jsx'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
      element: <Login />
      },
      {
      path: '/register',
      element: <Register />
    },
    {
      path: '/list',
      element: <List />
    },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>,
)
