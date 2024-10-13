import React, { useState, useEffect } from 'react'
import axios from 'axios'

function TodoForm({ todos, setTodos }) {
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        datavenc: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newTodos = [...todos, formData]
        setTodos(newTodos)
        setFormData({
            titulo: '',
            descricao: '',
            datavenc: ''
        })
        const response = await axios.post('http://localhost:8080/tarefas', formData)
    }

  return (
    <div className="form">
        <form onSubmit={handleSubmit}>
            <input type='text' 
            name='titulo'
            value={formData.titulo}
            onChange={handleChange}
            placeholder='Título da tarefa'
            required></input>

            <input type='text'
            name='descricao'
            value={formData.descricao}
            onChange={handleChange}
            placeholder='Descrição'
            required></input>

            <input type='date'
            name='datavenc'
            value={formData.datavenc}
            onChange={handleChange}
            placeholder='Data de vencimento da tarefa'
            required></input>

            <button className='addTodo' type='submit' onSubmit={handleSubmit}>Adicionar tarefa</button>
        </form>
    </div>
  )
}

export default TodoForm