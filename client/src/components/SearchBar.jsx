import React from 'react'

//Componente "barra de pesquisa", disponibilizando a possibilidade de
//visualização dos itens que contém o texto pesquisado no título
function SearchBar({ search, setSearch }) {
  return (
    <div>
        <input type="text" placeholder='Pesquisar tarefas' onChange={(e) => setSearch(e.target.value)}/>
    </div>
  )
}

export default SearchBar