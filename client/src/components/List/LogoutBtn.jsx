import React, { useContext } from 'react';
import { Context } from '../../AuthContext';

//Botão de logout, que redireciona para a pag de login e retira token e auth do usuário
function LogoutBtn() {
  //Importa a função para lidar com o logout do usuário
  const { handleExit } = useContext(Context)

  return (
    <>
      <button className='logoutBtn' onClick={handleExit}>Sair</button>
    </>
  );
}

export default LogoutBtn;
