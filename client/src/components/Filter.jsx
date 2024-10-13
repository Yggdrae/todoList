import React from 'react'

function Filter() {
  return (
    <div>
        <select name="filter" id="filter">
            <option value="">Filtrar tarefas</option>
            <option value="Completo">Completo</option>
            <option value="Incompleto">Incompleto</option>
        </select>
    </div>
  )
}

export default Filter