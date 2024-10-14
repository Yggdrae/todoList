import React, { useState } from 'react'
import axios from 'axios'

const Todo = ({ todo, allTodos, setTodos }) => {

    const locale = 'pt-br'
    const today = new Date().toLocaleDateString(locale)
    const date = new Date(todo.datavenc.split('T')[0]).toLocaleDateString(locale)

    //Função assíncrona para lidar com o clique do usuário no botão de completar tarefa
    const handleComplete = async (e) => {
        const completeTodos = [...allTodos]

        //Mapeia os itens e altera o status de completo do item no qual o botão foi clicado
        completeTodos.map(item => item.id === todo.id ? (item.jacompleta = !item.jacompleta) : item)
        //Renderiza novamente os itens na página, agora com o status atualizado do item clicado
        setTodos(completeTodos)
        //Envia o id do item para o servidor realizar a atualização do status de conclusão do item no banco de dados
        const response = await axios.put(`http://localhost:8080/tarefas/${todo.id}/${!todo.jacompleta}`)
    }

    //Função assíncrona para lidar com o clique do usuário no botão de excluir tarefa
    const handleDelete = async (e) => {
        //Filtra os itens da página, ignorando o item no qual o botão de excluir foi clicado
        const newTodos = [...allTodos].filter(item => item.id !== todo.id ? item : null)
        //Renderiza novamente os itens na página, agora sem o item excluído
        setTodos(newTodos)
        //Envia o id do item excluído para o servidor realizar a exclusão do banco de dados
        const response = await axios.delete(`http://localhost:8080/tarefas/${todo.id}`)
    }

    const [style, setStyle] = useState(true)
    //Função para alternar o display do forms de edição do item inline e
    //do item a ser editado. Quando clicado, o item some e o forms aparece
    //no lugar do mesmo, para que a edição seja feita
    const toggleForm = () =>{
        setStyle(!style)
    }

    //Constantes para manipulação do estado dos dados a serem enviados
    //do formulário de edição inline da tarefa
    const [formData, setFormData] = useState({
        titulo: todo.titulo,
        descricao: todo.descricao,
        datavenc: todo.datavenc
    })

    //Função para alterar o estado dos dados a serem enviados
    //do formulário de edição inline da tarefa
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    //Função assíncrona para lidar com a confirmação da edição inline da tarefa
    const handleEdition = async (e) => {
        //Impede a página de ser atualizada
        e.preventDefault()
        const newTodos = [...allTodos]
        //Mapeia os itens para encontrar a tarefa a ser editada e
        //insere os dados preenchidos dentro da mesma
        newTodos.map(item => item.id == todo.id ? (
            item.titulo = formData.titulo,
            item.descricao = formData.descricao,
            item.datavenc = formData.datavenc
        ) : item)
        //Alterna o display do forms e da tarefa alterada
        toggleForm()
        //Renderiza novamente as tarefas na página, agora com as informações novas do item alterado
        setTodos(newTodos)
        //Envia o id do item alterado, junto das novas informações preenchidas no forms
        //para o servidor atualizar os campos no banco de dados
        const response = await axios.put(`http://localhost:8080/tarefas/${todo.id}`, formData)
    }

  return (
        <div className='List'>
            <div className={!todo.jacompleta ? 'todo-item' : 'todo-completed'} id={todo.id} style={{display: style ? 'flex' : 'none'}}>
              <div className="content" style={{textDecoration: todo.jacompleta ? 'line-through' : ''}} onClick={toggleForm} >
                <p className='todoTitle'>{todo.titulo}</p>
                <p className='desc'>Descrição: {todo.descricao}</p>
                <p className='datavenc'>Vencimento: {date >= today ? date : 'Vencido'}</p>
              </div>
              <div className='editBtn'>
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