import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import NotesContext from '../context/notes/NotesContext';

const Login = () => {
  const host = 'http://localhost:8080/'
    const [formData, setFormData] = useState({email:"" , password:""});
    const navigate = useNavigate();

    useEffect(() => {
      if(window.localStorage.getItem('userToken'))
        navigate('/home');

    }, )
    

    const handleLogin =async(e)=>{
        e.preventDefault();
        console.log(formData);
        const res = await fetch(`${host}api/auth/login` , {
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(formData)
            });

        const result  = await res.json();
        console.log(result.errors);
    
    if(result.success){
        console.log(result , 'result')
        localStorage.setItem('userToken', result.authToken);
        window.location = '/home'
        // navigate('/home');
        setFormData({
          email:"" , password:""
         })
      }
      else{
        alert(result.errors[0].msg);
      }
    }
  return (
    <div className="login-box">
  <h2>Login</h2>
  <form >
    <div className="user-box">
      <input type="Email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.currentTarget.value})} name="" required=""/>
      <label>Email</label>
    </div>
    <div className="user-box">
      <input type="password" value={formData.password} onChange={(e)=>setFormData({...formData, password:e.currentTarget.value})} name="" required=""/>
      <label>Password</label>
    </div>
    <Link onClick={handleLogin}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </Link>
  </form>
  <br />
    <Link to='/signUp'>Sign up !! </Link>
</div>
  )
}

export default Login