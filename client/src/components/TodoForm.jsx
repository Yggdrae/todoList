import React, { useState, useEffect } from 'react'
import axios from 'axios'

function TodoForm({ todos, setTodos }) {
    //Constantes para manipulação do estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        datavenc: '',
    })

    //Função para alterar o estado dos dados a serem enviados
    //do formulário de criação de tarefa
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    //Função assíncrona para lidar com a confirmação da edição inline da tarefa
    const handleAdd = async (e) => {
        //Impede a página de ser atualizada
        e.preventDefault()
        //Constante que recebe todas as tarefas, adicionando a tarefa criada
        //const newTodos = [...todos, formData]
        //Renderiza novamente as tarefas na página, agora com a tarefa criada
        //setTodos(newTodos)
        //Apaga os campos do forms de criação de tarefa
        setFormData({
            titulo: '',
            descricao: '',
            datavenc: '',
        })
        //Envia as informações da tarefa criada para o servidor incluir o novo item ao banco de dados
        await axios.post('http://localhost:8080/tarefas', formData)
        const newTodos = await axios.get('http://localhost:8080/tarefas')
        setTodos(newTodos.data)
    }

  return (
    <div className="createForm">
        <form  onSubmit={handleAdd}>
            <input type='text' 
            className='addTodo' 
            name='titulo'
            value={formData.titulo}
            onChange={handleChange}
            placeholder='Título da tarefa'
            required></input>

            <input type='text'
            className='addTodo' 
            name='descricao'
            value={formData.descricao}
            onChange={handleChange}
            placeholder='Descrição'
            required></input>

            <input type='date'
            className='addTodo' 
            name='datavenc'
            value={formData.datavenc}
            onChange={handleChange}
            placeholder='Data de vencimento da tarefa'
            onKeyDown={(e) => e.preventDefault()}
            required></input>

            <button 
            type='submit' 
            onSubmit={handleAdd}>Adicionar tarefa</button>
        </form>
    </div>
  )
}

export default TodoForm