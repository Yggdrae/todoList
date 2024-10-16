import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './AuthContext'

function App() {

  return (
    <>
      <AuthProvider value={{ authenticated: false }}>  
        <div className='formContainer'>
          <Outlet />
        </div>
      </AuthProvider>
    </>
  )
}

export default App