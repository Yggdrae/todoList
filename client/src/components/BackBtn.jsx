import React, { useContext } from 'react'; // Adicione esta linha
import { useNavigate } from 'react-router-dom';

function BackBtn() {
  
  const navigate = useNavigate();

  function handleGoBack() {
    return navigate('/');
  }

  return (
    <>
      <button className='logoutBtn' onClick={handleGoBack}>Voltar</button>
    </>
  );
}

export default BackBtn;
