import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Todo from './components/todo'
import TodoForm from './components/TodoForm'
import Filter from './components/Filter'

function App() {
  const [array, setArray] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/getTodo')
    setArray(response.data)
  }

  useEffect(() => {
    fetchAPI();
  }, [])
  
  return (
    <>
      <h1>Lista de Tarefas</h1>
      <div className="todo-list">
        <div className="formFilter">
          <TodoForm />
          <Filter />
        </div>
        <hr />
        {
          array.map((todo, index) => (
            <Todo todo={todo}/>
          ))
        }
      </div>
    </>
  )
}

export default App
