import React, { useState } from 'react'
import Item from './Item'
import EditForm from './EditForm'

const Todo = ({ todo, allTodos, setTodos }) => {

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
            <Item  toggleForm={toggleForm} 
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

export default Todo