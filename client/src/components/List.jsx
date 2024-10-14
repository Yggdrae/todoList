import { useState, useEffect } from 'react'
import axios from 'axios'
import Todo from './todo'
import TodoForm from './TodoForm'
import Filter from './Filter'
import SearchBar from './SearchBar'

function List() {
  const [todos, setTodos] = useState([]) //State para render da lista de tarefas
  const [filter, setFilter] = useState('All') //State para o componente Filter (filtar por)
  const [search, setSearch] = useState('') //State para o componente Search (barra de pesquisa)

  //Função assíncrona para trazer as tarefas salvas no banco de dados
  //e renderizar na página utilizando "setState"
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/tarefas')
    setTodos(response.data)
  }

  //Hook para utilizar a função assíncrona que renderiza
  //a lista de tarefas ao acessar a página
  useEffect(() => {
    fetchAPI();
  }, [])
  
  return (
    <>
      <h1>Lista de Tarefas</h1>
      <div className="todo-list">
        <h2>Adicionar Tarefa</h2>
        <TodoForm todos={todos} setTodos={setTodos}/>
        <hr />
        <h2>Filtrar Tarefas</h2>
        <div className="searchFilter">
          <SearchBar search={search} setSearch={setSearch}/>
          <Filter filter={filter} setFilter={setFilter} />
        </div>
        <hr />
        {
          //Filtra e mapeia todos os items da To-do para então renderizar
          //um componente "todo" para cada item mapeado
          todos
          .filter((todo) => todo.titulo.toLowerCase().includes(search.toLocaleLowerCase())) //Filtro de pesquisa
          .filter((todo) => filter === 'All' ? true : filter === 'completed' ? todo.jacompleta : !todo.jacompleta) //Filtro de "ordenar por"
          .map((todo) => (
            <Todo todo={todo} allTodos={todos} setTodos={setTodos} />
          ))
        }
      </div>
    </>
  )
}

export default List