import React, { useContext } from 'react'; // Adicione esta linha
import { useNavigate } from 'react-router-dom';
import { Context } from '../AuthContext';

function LogoutBtn() {
  const { authenticated, setAuthenticated } = useContext(Context);
  
  const navigate = useNavigate();

  function handleLogout() {
    return navigate('/');
  }

  return (
    <>
      <button className='logoutBtn' onClick={handleLogout}>Sair</button>
    </>
  );
}

export default LogoutBtn;
