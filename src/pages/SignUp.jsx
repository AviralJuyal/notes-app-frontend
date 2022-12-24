import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const host = 'http://localhost:8080/'
    const [formData, setFormData] = useState({name:"" ,email:"" , password:""});
    const navigate = useNavigate();
    useEffect(() => {
      if(window.localStorage.getItem('userToken'))
        navigate('/home');

    }, )

    const handleSignup =async(e)=>{
        e.preventDefault();
        console.log(formData);
       const {name, email, password} = formData;
        const res = await fetch(`${host}api/auth/createUser` , {
            method:'POST',
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify({name ,  email , password })
          })
          const result  = await res.json();
          console.log(result)
          if(result.success){
            console.log(result , 'result')
            localStorage.setItem('userToken', result.authToken);
            window.location = '/home'
            // navigate('/home');
             setFormData({
               name:"", email:"" , password:""
              })
          }
          else{
            alert(result.errors[0].msg);
          }
    }
    return (
        <div className="login-box">
      <h2>Sign Up</h2>
      <form >
        <div className="user-box">
          <input type="text" onChange={(e)=>setFormData({...formData, name:e.currentTarget.value})} name="" required=""/>
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type="Email" onChange={(e)=>setFormData({...formData, email:e.currentTarget.value})} name="" required=""/>
          <label>Email</label>
        </div>
        <div className="user-box">
          <input type="password" onChange={(e)=>setFormData({...formData, password:e.currentTarget.value})} name="" required=""/>
          <label>Password</label>
        </div>
        <Link onClick={handleSignup}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </Link>
      </form>
      <br />
        <Link to='/'>Login !! </Link>
    </div>
      )
}

export default SignUp