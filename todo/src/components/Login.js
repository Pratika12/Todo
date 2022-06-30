import React,{useState} from 'react'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const navigate = useNavigate();
    
    const handleSubmit= async (e)=>
    {
        e.preventDefault();
        const t=document.getElementById('msg');
        try
        {
            const result= await auth.signInWithEmailAndPassword(email,pass);
            t.innerHTML=`Welcome ${result.user.email}`
            t.classList='alert-success my-4'
            t.style.padding="15px";
            navigate('/Todo.js');
        }
        catch(error)
        {
            // t.innerHTML=`${error.message}`;
            t.innerHTML=`Invalid Credentials`;
            t.classList='alert-danger my-4';
            t.style.padding="15px";
        }
    }
  return (
    <div className="container" style={{maxWidth:"500px"}}>
        <h3 className="my-4 text-center">Please Login</h3>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="my-4">
            <label htmlFor="loginEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="loginEmail" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className="my-4">
            <label htmlFor="loginPass" className="form-label">Password</label>
            <input type="password" className="form-control" id="loginPass" value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
        </div>
        <div className='text-center'>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
        <div id='msg'></div>
    </div>
  )
}
