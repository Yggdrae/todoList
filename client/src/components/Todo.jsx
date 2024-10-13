import React from 'react'
import axios from 'axios'

const Todo = ({todo}) => {

    const locale = 'pt-br'
    const today = new Date().toLocaleDateString(locale)
    const date = new Date(todo.datavenc.split('T')[0]).toLocaleDateString(locale)

    const handleComplete = async (e) => {
        const response = await axios.put(`http://localhost:8080/tarefas/${todo.id}/${todo.jacompleta}`)
    }

    const handleDelete = async (e) => {
        const response = await axios.delete(`http://localhost:8080/tarefas/${todo.id}`)
    }

  return (
    <div className='todo-item' id={todo.id}>
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