import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Todo from '../components/todo'
import TodoForm from '../components/TodoForm'
import Filter from '../components/Filter'
import SearchBar from '../components/SearchBar'
import LogoutBtn from '../components/LogoutBtn'
import { Context } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

function List() {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(Context);
  const [todos, setTodos] = useState([]) //State para render da lista de tarefas
  const [filter, setFilter] = useState('All') //State para o componente Filter (filtar por)
  const [search, setSearch] = useState('') //State para o componente Search (barra de pesquisa)

  //Função assíncrona para trazer as tarefas salvas no banco de dados
  //e renderizar na página utilizando "setState"
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/tarefas')
    setTodos(response.data)
  }

  //Hook para verificar autenticação do usuário e redirecioná-lo caso o mesmo não
  //tenha sido autenticado, e utilizar a função assíncrona que renderiza a lista
  //de tarefas ao acessar a página
  useEffect(() => {
    if(localStorage.getItem('token') == null || authenticated == false){
      alert('Usuário não foi autenticado, redirecionando')
      return navigate('/')
    }

    fetchAPI();
  }, [])
  
  return (
      <>
        <LogoutBtn />
        <h1>Lista de Tarefas</h1>
        <hr />
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
          .filter((todo) => todo.title.toLowerCase().includes(search.toLocaleLowerCase())) //Filtro de pesquisa
          .filter((todo) => filter === 'All' ? true : filter === 'completed' ? todo.iscomplete : !todo.iscomplete) //Filtro de "ordenar por"
          .map((todo) => (
            <Todo todo={todo} allTodos={todos} setTodos={setTodos} />
          ))
        }
      </>
  )
}

export default List