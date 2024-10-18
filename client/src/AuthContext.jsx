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
        email: '',
        senha: ''
    })

    //Função assíncrona para lidar com o login, armazenando um token no localStorage
    //caso haja sucesso no login
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = (await axios.post('http://localhost:8080/login', formData))
        localStorage.setItem('token', JSON.stringify(response.data.accessToken))
        axios.defaults.headers.Authorization = `${response}`
        setAuthenticated(true)
        return navigate("/list")
    }

    const handleExit = () => {
      setAuthenticated(false);
      localStorage.removeItem('token');
      return navigate('/')
    }

  return (
    <Context.Provider value={{ authenticated, setAuthenticated, handleSubmit, formData, setFormData, handleExit }}>
        {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider }