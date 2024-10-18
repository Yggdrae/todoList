import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackBtn() {
  
  const navigate = useNavigate();
  
  //Botão para voltar para a pag inicial
  function handleGoBack() { 
    return navigate('/');
  }

  return (
    <>
      <button  onClick={handleGoBack}>Voltar</button>
    </>
  );
}

export default BackBtn;
