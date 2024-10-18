import React, { useState } from 'react'
import axios from 'axios'


//Componente Formulário de Edição.
//Esse componente aparece em tela quando o usuário clica na área de Titulo, descrição
//e vencimento da tarefa, assim possibilitando a edição direta no item
function EditForm({ toggleForm, todo, allTodos, setTodos }) {

    //Constantes para manipulação do estado dos dados a serem enviados
    //do formulário de edição inline da tarefa
    const [formData, setFormData] = useState({
        titulo: todo.title,
        descricao: todo.description,
        datavenc: todo.date
    })

    //Preenchimento padrão do formulário de edição
    const defaultForm = {
        titulo: todo.title,
        descricao: todo.description,
        datavenc: todo.date
    }

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

    //Cancela a edição do item, resetando o preenchimento do formulário de edição
    const handleCancelEdit = () => {
        setFormData(defaultForm)
        toggleForm
    }

  return (
    <>
      <form className={!todo.iscomplete ? 'todo-item' : 'todo-completed'} 
                onSubmit={handleEdition}>  {/* formulario de edição inline do item */}

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
                    <button className='completeBtn' 
                    type='submit' 
                    onSubmit={handleEdition}>Confirmar</button> {/* Botão para confirmar a edição feita nos campos do formulário */}

                    <button className='deleteBtn' 
                    type='button' 
                    onClick={toggleForm}>Cancelar</button> {/* Botão que cancela a edição atual */}
                </div>
            </form>
    </>
  )
}

export default EditForm