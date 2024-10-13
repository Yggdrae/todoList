import React from 'react'

const Todo = ({todo}) => {
  return (
    <div className='todo-item'>
              <div className="content">
                <p className='todoTitle'>{todo.titulo}</p>
                <p className='desc'>Descrição: {todo.descricao}</p>
              </div>
              <div>
                <button>Completar</button>
                <button>X</button>
              </div>
            </div>
  )
}

export default Todo