import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BackBtn from '../components/Register/BackBtn'
import RegisterForm from '../components/Register/RegisterForm'

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
            } 
        }
    }

  return (
    <>
        <h1>Cadastro de Novo Usuário</h1>
        <RegisterForm handleSubmit={handleSubmit}
        validateForm={validateForm}
        handleChange={handleChange}
        formData={formData} setFormData={setFormData}
        formError={formError} setFormError={setFormError} />
        <BackBtn />
    </>
  )
}

export default Register