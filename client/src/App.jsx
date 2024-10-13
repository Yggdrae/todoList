import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [array, setArray] = useState([])
  const [count, setCount] = useState(0)

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/getTodo')
    setArray(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchAPI();
  }, [])
  
  return (
    <>
      
    </>
  )
}

export default App
