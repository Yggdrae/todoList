import React, { useState } from 'react'
import axios from 'axios'

function Login() {

    //Constantes para manipulação do estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const [formData, setFormData] = useState({
        usuario: '',
        senha: ''
    })

    //Função para alterar o estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/login', formData)
    }

  return (
    <>
        <div className='loginContainer'>
            <h1>Entrar</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className="user">

                    <label htmlFor="username">Nome de usuário: </label>
                    <input type="text" 
                    id='username' 
                    name='usuario' 
                    autoComplete='username' 
                    onChange={handleChange} />
                
                </div>
                <div className="pass">

                    <label htmlFor="password">Senha: </label>
                    <input type="password" 
                    id='password' 
                    name='senha' 
                    onChange={handleChange} />

                </div>
                <button type='submit'>Entrar</button>
            </form>
        </div>
    </>
  )
}

export default Login