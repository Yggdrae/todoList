import React, { useState } from 'react'
import axios from 'axios'

const Todo = ({ todo, allTodos, setTodos }) => {

    const locale = 'pt-br'
    const today = new Date().toLocaleDateString(locale)
    const date = new Date(todo.datavenc.split('T')[0]).toLocaleDateString(locale)

    const handleComplete = async (e) => {
        const completeTodos = [...allTodos]
        completeTodos.map(item => item.id === todo.id ? (item.jacompleta = !item.jacompleta) : item)
        setTodos(completeTodos)
        const response = await axios.put(`http://localhost:8080/tarefas/${todo.id}/${!todo.jacompleta}`)
    }

    const handleDelete = async (e) => {
        const newTodos = [...allTodos].filter(item => item.id !== todo.id ? item : null)
        setTodos(newTodos)
        const response = await axios.delete(`http://localhost:8080/tarefas/${todo.id}`)
    }

    const [style, setStyle] = useState(true)

    const toggleForm = () =>{
        setStyle(!style)
    }

    const [formData, setFormData] = useState({
        titulo: todo.titulo,
        descricao: todo.descricao,
        datavenc: todo.datavenc
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleEdition = async (e) => {
        e.preventDefault()
        const newTodos = [...allTodos]
        newTodos.map(item => item.id == todo.id ? (
            item.titulo = formData.titulo,
            item.descricao = formData.descricao,
            item.datavenc = formData.datavenc
        ) : item)
        toggleForm()
        setTodos(newTodos)
        const response = await axios.put(`http://localhost:8080/tarefas/${todo.id}`, formData)
    }

  return (
        <div>
            <div className={!todo.jacompleta ? 'todo-item' : 'todo-completed'} id={todo.id} style={{display: style ? 'flex' : 'none'}}>
              <div className="content" style={{textDecoration: todo.jacompleta ? 'line-through' : ''}} onClick={toggleForm} >
                <p className='todoTitle'>{todo.titulo}</p>
                <p className='desc'>Descrição: {todo.descricao}</p>
                <p className='datavenc'>Vencimento: {date >= today ? date : 'Vencido'}</p>
              </div>
              <div>
                <button onClick={handleComplete}>{todo.jacompleta ? 'Desfazer' : 'Completar'}</button>
                <button onClick={handleDelete}>Excluir</button>
              </div>
            </div>
            <form className={!todo.jacompleta ? 'todo-item' : 'todo-completed'} 
                style={{display: !style ? 'flex' : 'none'}} 
                onSubmit={handleEdition}>
                <div className="editForm">
                    <input type="text" name='titulo' value={formData.titulo} onChange={handleChange}/>
                    <input type="text" name='descricao' value={formData.descricao} onChange={handleChange}/>
                    <input type="date" name='datavenc' value={formData.datavenc} onChange={handleChange}/>
                </div>
                <div>
                    <button type='submit' onSubmit={handleEdition}>Confirmar</button>
                    <button type='button' onClick={toggleForm}>Cancelar</button>
                </div>
            </form>
        </div>
  )
}

export default Todo