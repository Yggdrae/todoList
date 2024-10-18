import React from 'react'

//Formulário de cadastro do usuário
function RegisterForm({ handleSubmit, handleChange, formError }) {
  return (
        <form className='loginForm' onSubmit={handleSubmit}>
            <div className="user">

                <label htmlFor="username">Nome de usuário: </label>
                <input type="text" 
                id='username' 
                name='username' 
                autoComplete='username' 
                onChange={handleChange}
                required />
                <p className='formError'>{formError.username}</p>
            </div>

            <div className="user">

                <label htmlFor="email">E-mail: </label>
                <input type="email" 
                id='email' 
                name='email' 
                autoComplete='email' 
                onChange={handleChange}
                required />
                <p className='formError'>{formError.email}</p>

            </div>

            <div className="pass">

                <label htmlFor="password">Senha: </label>
                <input type="password" 
                id='password' 
                name='password' 
                onChange={handleChange}
                required />
                <p className='formError'>{formError.password}</p>

            </div>
            <div className="pass">

                <label htmlFor="password">Confirme sua senha: </label>
                <input type="password" 
                id='confPassword' 
                name='confPassword' 
                onChange={handleChange}
                required />
                <p className='formError'>{formError.confPassword}</p>

            </div>
            <button type='submit' className='submitBtn'>Cadastrar</button>
        </form>
  )
}

export default RegisterForm