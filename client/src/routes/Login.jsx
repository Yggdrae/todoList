import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../AuthContext'

function Login() {
    const { authenticated, setAuthenticated, handleSubmit, formData, setFormData } = useContext(Context)

    //Função para alterar o estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

  return (
    <>
            <h1>Entrar</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className="user">

                    <label htmlFor="username">Nome de usuário: </label>
                    <input type="text" 
                    id='username' 
                    name='usuario' 
                    autoComplete='username' 
                    onChange={handleChange}
                    required />
                
                </div>
                <div className="pass">

                    <label htmlFor="password">Senha: </label>
                    <input type="password" 
                    id='password' 
                    name='senha' 
                    onChange={handleChange} 
                    required/>

                </div>

                <button type='submit' className='submitBtn'>Entrar</button>
                <p>Não possui uma conta?</p>
                <Link to='/register'>Registre-se</Link>
            </form>
    </>
  )
}

export default Login