import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Todo from './components/todo'
import TodoForm from './components/TodoForm'
import Filter from './components/Filter'
import SearchBar from './components/SearchBar'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/tarefas')
    setTodos(response.data)
  }

  useEffect(() => {
    fetchAPI();
  }, [])
  
  return (
    <>
      <h1>Lista de Tarefas</h1>
      <div className="todo-list">
        <h2>Adicionar Tarefa</h2>
        <TodoForm setTodos={setTodos}/>
        <hr />
        <h2>Filtrar Tarefas</h2>
        <div className="searchFilter">
          <SearchBar search={search} setSearch={setSearch}/>
          <Filter filter={filter} setFilter={setFilter} />
        </div>
        <hr />
        {
          todos
          .filter((todo) => filter === 'All' ? true : filter === 'completed' ? todo.jacompleta : !todo.jacompleta)
          .filter((todo) => todo.titulo.toLowerCase().includes(search.toLocaleLowerCase()))
          .map((todo, index) => (
            <Todo todo={todo}/>
          ))
        }
      </div>
    </>
  )
}

export default App
