import React from 'react'

//Componente "filtrar por", disponibilizando a possibilidade de visualização de
//todos os itens, apenas os itens completos ou apenas os itens incompletos
function Filter({ filter, setFilter}) {
  return (
    <div>
        <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">Todos</option>
            <option value="completed">Completo</option>
            <option value="incomplete">Incompleto</option>
        </select>
    </div>
  )
}

export default Filter