import Navbar from './components/NavBar'
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup';
import Todo from './components/Todo';
import React,{useState,useEffect} from 'react';
import About from './components/AboutUs'
import {auth} from './firebase'

function App() {
  const [user,setUser]=useState('');
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user) setUser(user);
      else setUser(null);
    })
  },[])
  return (
    <div>
      <BrowserRouter> 
        <Navbar user={user}/>
        <Routes>
          <Route exact path="/" element={<Todo user={user}/>}/>
          <Route exact path="/AboutUs.js" element={<About/>}/>
          <Route exact path="/Login.js" element={<Login/>}/>
          <Route exact path="/Signup.js" element={<Signup/>}/>
          <Route exact path="/Todo.js" element={<Todo user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
