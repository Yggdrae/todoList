import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div className='formContainer'>
        <Outlet />
      </div>
    </>
  )
}

export default App