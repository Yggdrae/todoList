import React, { useState } from 'react'
import axios from 'axios'

const Todo = ({ todo, allTodos, setTodos }) => {

    const [style, setStyle] = useState(false)

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

  return (
    <div className={!todo.jacompleta ? 'todo-item' : 'todo-completed'} id={todo.id}>
              <div className="content" style={{textDecoration: todo.jacompleta ? 'line-through' : ''}}>
                <p className='todoTitle'>{todo.titulo}</p>
                <p className='desc'>Descrição: {todo.descricao}</p>
                <p className='datavenc'>Vencimento: {date >= today ? date : 'Vencido'}</p>
              </div>
              <div>
                <button onClick={handleComplete}>{todo.jacompleta ? 'Desfazer' : 'Completar'}</button>
                <button onClick={handleDelete}>Excluir</button>
              </div>
            </div>
  )
}

export default Todo