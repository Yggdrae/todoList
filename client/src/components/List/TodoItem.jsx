import React, { useState } from 'react'
import TodoContent from './TodoContent'
import EditForm from './EditForm'

const TodoItem = ({ todo, allTodos, setTodos }) => {

    const [style, setStyle] = useState(true)
    //Função para alternar o display do forms de edição do item inline e
    //do item a ser editado. Quando clicado, o item some e o forms aparece
    //no lugar do mesmo, para que a edição seja feita
    const toggleForm = () =>{
        setStyle(!style)
    }

  return (
        <div className='List'>
            { style ? 
            <TodoContent  toggleForm={toggleForm} 
            todo={todo} 
            allTodos={allTodos}
            setTodos={setTodos} />
            :
            <EditForm  toggleForm={toggleForm} 
            todo={todo} 
            allTodos={allTodos}
            setTodos={setTodos} />
        
            }
        </div>      
  )
}

export default TodoItem