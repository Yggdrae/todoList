import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BackBtn from '../components/Register/BackBtn'
import RegisterForm from '../components/Register/RegisterForm'

function Register() {


     //Constantes para manipulação do estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confPassword: ''
    })

    const [ formError, setFormError ] = useState({
        username: '',
        email: '',
        password: '',
        confPassword: ''
    }) 

    //Função para alterar o estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const validateForm = () => {
        const inputError = {
            username: '',
            email: '',
            password: '',
            confPassword: ''
        }

        setFormError(inputError)

        if(formData.username.length < 5) {
            setFormError({
                ...inputError,
                username: 'Nome de usuário deve conter ao menos 5 carateres'
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

        if(formData.password.length < 8){
            setFormError({
                ...inputError,
                password: 'Sua senha deve conter ao menos 8 caracteres!'
            })
            return true;
        }

        if(formData.password != formData.confPassword){
            setFormError({
                ...inputError,
                confPassword: 'As senhas não coincidem!'
            })
            return true;
        }
    }
    
    const navigate = useNavigate();

    //Função assíncrona que envia o formulário de cadastro para o servidor
    //e retorna um alerta com a mensagem 
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!validateForm()){
            const response = await axios.post('http://localhost:8080/signup', formData)
            if(response.data == 'Usuário cadastrado com sucesso!'){
                alert(response.data)
                return navigate('/')
            } else alert(response.data)
        }
    }

  return (
    <>
        <h1>Cadastro de Novo Usuário</h1>
        <RegisterForm handleSubmit={handleSubmit}
        handleChange={handleChange}
        formError={formError} />
        <BackBtn />
    </>
  )
}

export default Register