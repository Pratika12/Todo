import React,{useState} from 'react'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e)=>
    {
        e.preventDefault();
        const t=document.getElementById('msg');
        // console.log(t);
        try
        {
            const result= await auth.createUserWithEmailAndPassword(email,pass);
            t.innerHTML=`Welcome ${result.user.email}`
            t.classList='alert-success my-4'
            t.style.padding="15px";
            navigate('/');
        }
        catch(error)
        {
            t.innerHTML=`${error.message}`;
            t.classList='alert-danger my-4';
            t.style.padding="15px";
        }
    }
  return (
    <div className="container" style={{maxWidth:"500px"}}>
        <h3 className="my-4 text-center">Please Register</h3>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="my-4">
            <label htmlFor="enterEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="enterEmail" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className="my-4">
            <label htmlFor="enterPass" className="form-label">Password</label>
            <input type="password" className="form-control" id="enterPass" value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
        </div>
        <div className='text-center'>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>

        
        <div id="msg" className='container my-4 alert'></div>
    </div>
  )
}
