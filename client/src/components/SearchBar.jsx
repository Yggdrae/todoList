import React from 'react'

function SearchBar({ search, setSearch }) {
  return (
    <div>
        <input type="text" placeholder='Pesquisar tarefas' onChange={(e) => setSearch(e.target.value)}/>
    </div>
  )
}

export default SearchBar