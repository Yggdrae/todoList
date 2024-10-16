import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Register() {

     //Constantes para manipulação do estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        senha: '',
        confSenha: ''
    })

    const [ formError, setFormError ] = useState({
        usuario: '',
        email: '',
        senha: '',
        confSenha: ''
    }) 

    //Função para alterar o estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const validateForm = () => {
        const inputError = {
            usuario: '',
            email: '',
            senha: '',
            confSenha: ''
        }

        setFormError(inputError)

        if(formData.usuario.length < 5) {
            setFormError({
                ...inputError,
                usuario: 'Nome de usuário deve conter ao menos 5 carateres'
            })
            return true;
        }

        if(formData.email.length < 11) {
            setFormError({
                ...inputError,
                email: 'Email inválido'
            })
            return true;
        }

        if(formData.senha.length < 8){
            setFormError({
                ...inputError,
                senha: 'Sua senha deve conter ao menos 8 caracteres!'
            })
            return true;
        }

        if(formData.senha != formData.confSenha){
            setFormError({
                ...inputError,
                confSenha: 'As senhas não coincidem!'
            })
            return true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!validateForm()){
            const response = await axios.post('http://localhost:8080/signup', formData)
            alert(response.data)
            console.log(response)
        }
    }

  return (
    <>
        <h1>Cadastro de Novo Usuário</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className="user">

                    <label htmlFor="username">Nome de usuário: </label>
                    <input type="text" 
                    id='username' 
                    name='usuario' 
                    autoComplete='username' 
                    onChange={handleChange}
                    required />
                    <p className='formError'>{formError.usuario}</p>
                </div>

                <div className="user">

                    <label htmlFor="email">E-mail: </label>
                    <input type="email" 
                    id='email' 
                    name='email' 
                    autoComplete='email' 
                    onChange={handleChange}
                    required />
                    <p className='formError'>{formError.email}</p>

                </div>

                <div className="pass">

                    <label htmlFor="password">Senha: </label>
                    <input type="password" 
                    id='password' 
                    name='senha' 
                    onChange={handleChange}
                    required />
                    <p className='formError'>{formError.senha}</p>

                </div>
                <div className="pass">

                    <label htmlFor="password">Confirme sua senha: </label>
                    <input type="password" 
                    id='confPassword' 
                    name='confSenha' 
                    onChange={handleChange}
                    required />
                    <p className='formError'>{formError.confSenha}</p>

                </div>
                <button type='submit' className='submitBtn'>Cadastrar</button>
            </form>
            <Link to='/'>Voltar</Link>
    </>
  )
}

export default Register