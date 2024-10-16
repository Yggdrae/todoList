import React, { useState } from 'react'
import axios from 'axios'

const Todo = ({ todo, allTodos, setTodos }) => {

    const locale = 'pt-br'
    const today = new Date().toLocaleDateString(locale) 
    const date = new Date(todo.datavenc).toLocaleDateString(locale)

    //Função assíncrona para lidar com o clique do usuário no botão de completar tarefa
    const handleComplete = async (e) => {
        const completeTodos = [...allTodos]
        //Mapeia os itens e altera o status de completo do item no qual o botão foi clicado
        completeTodos.map(item => item.id === todo.id ? (item.jacompleta = !item.jacompleta) : item)
        //Renderiza novamente os itens na página, agora com o status atualizado do item clicado
        setTodos(completeTodos)
        //Envia o id do item para o servidor realizar a atualização do status de conclusão do item no banco de dados
        await axios.put(`http://localhost:8080/tarefas/${todo.id}/${!todo.jacompleta}`)
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
        //Envia o id do item alterado, junto das novas informações preenchidas no forms
        //para o servidor atualizar os campos no banco de dados
        await axios.put(`http://localhost:8080/tarefas/${todo.id}`, formData)
        //Busca as tarefas, desta vez atualizada, para armazenar numa constante para
        //ser usada na atualização das tarefas na página
        const newTodos = await axios.get('http://localhost:8080/tarefas')
        //Renderiza novamente os itens na página, agora sem o item excluído
        setTodos(newTodos.data)
        //Alterna o display, desta vez escondendo o forms e renderizando novamente
        //o item, agora atualizado
        toggleForm()
    }

  return (
        <div className='List'>
            <div className={!todo.jacompleta ? 'todo-item' : 'todo-completed'} id={todo.id} style={{display: style ? 'flex' : 'none'}}>
              
              <div className="content" 
              style={{textDecoration: todo.jacompleta ? 'line-through' : ''}} 
              onClick={toggleForm} >
              
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

                    <input type="text" 
                    name='titulo' 
                    value={formData.titulo} 
                    onChange={handleChange}/>

                    <input type="text" 
                    name='descricao' 
                    value={formData.descricao} 
                    onChange={handleChange}/>
                    
                    <input type="date" 
                    name='datavenc' 
                    value={formData.datavenc} 
                    onChange={handleChange} 
                    onKeyDown={(e) => e.preventDefault()}/>
                
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