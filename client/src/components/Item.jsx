import React from 'react'
import axios from 'axios'

function Item({ toggleForm, todo, allTodos, setTodos }) {

    const locale = 'pt-br'
    const today = new Date().toLocaleDateString(locale) 
    const date = new Date(todo.date).toLocaleDateString(locale) 

    //Função assíncrona para lidar com o clique do usuário no botão de completar tarefa
    const handleComplete = async (e) => {
        const completeTodos = [...allTodos]
        //Mapeia os itens e altera o status de completo do item no qual o botão foi clicado
        completeTodos.map(item => item.id === todo.id ? (item.iscomplete = !item.iscomplete) : item)
        //Renderiza novamente os itens na página, agora com o status atualizado do item clicado
        setTodos(completeTodos)
        //Envia o id do item para o servidor realizar a atualização do status de conclusão do item no banco de dados
        await axios.put(`http://localhost:8080/tarefas/${todo.id}/${!todo.iscomplete}`)
    }

    //Função assíncrona para lidar com o clique do usuário no botão de excluir tarefa
    const handleDelete = async (e) => {
        //Envia o id do item excluído para o servidor realizar a exclusão do banco de dados
        await axios.delete(`http://localhost:8080/tarefas/${todo.id}`)
        //Busca as tarefas, desta vez atualizada, para armazenar numa constante para
        //ser usada na atualização das tarefas na página
        const newTodos = await axios.get('http://localhost:8080/tarefas')
        //Renderiza novamente os itens na página, agora sem o item excluído
        setTodos(newTodos.data)
    }

  return (
    <>
      <div className={!todo.iscomplete ? 'todo-item' : 'todo-completed'} id={todo.id}>
              
              <div className="content" 
              style={{textDecoration: todo.iscomplete ? 'line-through' : ''}} 
              onClick={toggleForm} >
              
                <p className='todoTitle'>{todo.title}</p>
                <p className='desc'>Descrição: {todo.description}</p>
                <p className='datavenc'>Vencimento: {date}</p>
             
              </div>

              <div className='editBtn'>
                <button className='completeBtn' onClick={handleComplete}>{todo.iscomplete ? 'Desfazer' : 'Completar'}</button>
                <button className='deleteBtn' onClick={handleDelete}>Excluir</button>
                </div>
            </div>
    </>
  )
}

export default Item