import React, { useState } from 'react'
import axios from 'axios'

function EditForm({ toggleForm, todo, allTodos, setTodos }) {

    //Constantes para manipulação do estado dos dados a serem enviados
    //do formulário de edição inline da tarefa
    const [formData, setFormData] = useState({
        titulo: todo.title,
        descricao: todo.description,
        datavenc: todo.date
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
    <>
      <form className={!todo.iscomplete ? 'todo-item' : 'todo-completed'} 
                onSubmit={handleEdition}>

                <div className="editForm">

                    <input type="text" 
                    name='titulo' 
                    value={formData.titulo} 
                    onChange={handleChange}
                    required />

                    <input type="text" 
                    name='descricao' 
                    value={formData.descricao} 
                    onChange={handleChange}
                    required />
                    
                    <input type="date" 
                    name='datavenc' 
                    value={formData.datavenc} 
                    onChange={handleChange} 
                    onKeyDown={(e) => e.preventDefault()} />
                
                </div>
                <div className='editBtn'>
                    <button className='completeBtn' type='submit' onSubmit={handleEdition}>Confirmar</button>
                    <button className='deleteBtn' type='button' onClick={toggleForm}>Cancelar</button>
                </div>
            </form>
    </>
  )
}

export default EditForm