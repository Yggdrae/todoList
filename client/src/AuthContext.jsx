import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Context = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [ authenticated, setAuthenticated ] = useState(false)

    //Constantes para manipulação do estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const [formData, setFormData] = useState({
        usuario: '',
        senha: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = (await axios.post('http://localhost:8080/login', formData)).data.accessToken
        localStorage.setItem('token', JSON.stringify(response))
        axios.defaults.headers.Authorization = `Bearer ${response}`
        setAuthenticated(true)
        return navigate("/list")
    }

  return (
    <Context.Provider value={{ authenticated, setAuthenticated, handleSubmit, formData, setFormData }}>
        {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider }