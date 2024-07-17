import React, { useState } from 'react'
import './Login.css'

import { fetchLogin, fetchRegister } from '../../store/features/authSlice';
import { SocialDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch: SocialDispatch = useDispatch();
    const navigate = useNavigate();
    const [isActive,setIsActive] = useState(false);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');

    const register = () => {
        dispatch(fetchRegister({userName,password,rePassword,email}))
        .then(data => {
          if(data.payload.code === 200){
            swal("Basarili!", "Kullanıcı kayıt edilmistir!", "success").then(() => setIsActive(true));
          }
        })
    }

    const login = () => {
        dispatch(fetchLogin({userName,password}))
        .then(data=> {
          if(data.payload.code === 200){
              navigate('/') //   /-> root a git -> www.hepsiburada.com
          }
        })
    }


  return (
    

<section className={isActive ? "wrapper active" : "wrapper"}>
      <div className="form signup">
        <header onClick={() => setIsActive(false)} >Register</header>
        <form action="#">
          <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" required />
          <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email address" required />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
          <input onChange={(e) => setRePassword(e.target.value)} type="password" placeholder="RePassword" required />
         

          <div className="checkbox">
            <input type="checkbox" id="signupCheck" />
            <label htmlFor="signupCheck">I accept all terms & conditions</label>
          </div>
          <input  type="button" value="Signup" onClick={register} />
        </form>
      </div>

      <div className="form login">
        <header onClick={() => setIsActive(true)}>Login</header>
        <form action="#">
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <a href="#">Forgot password?</a>
          <input  type="button" value="Login"  onClick={login}/>
        </form>
      </div>


    </section>
   
  )
}

export default Login