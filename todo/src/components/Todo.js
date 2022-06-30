import React,{useState,useEffect} from 'react'
import {db} from '../firebase'
import { useNavigate } from 'react-router-dom';

export default function Todo({user}) {

  const [text,setText]=useState('');
  const [todoarr,setTodoArr]=useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user)
    {
      const docRef=db.collection('todos').doc(user.uid);
      // console.log(docRef);
      docRef.onSnapshot(docSnap=>{
        if(docSnap.exists)
        {
          setTodoArr(docSnap.data().todo);
          // console.log(todoarr);
        }
        else
        {
          console.log("List has 0 items");
        }
      })
    }
    else
    {
      
    }
  },[])

  const addTodo =(e)=>{
    if(user)
    {
    e.preventDefault();
    console.log("called");
    db.collection('todos').doc(user.uid).set({
        todo:[...todoarr,text]
      }
    )
    }
    else
    {
      navigate('/Login.js');
    }
  }

  const deleteTodo =(todo_we_want_to_delete)=>{
    const docRef=db.collection('todos').doc(user.uid);
    docRef.get().then(docSnap=>{
      const result=docSnap.data().todo.filter(individual_todo=> individual_todo!=todo_we_want_to_delete)
      docRef.update({
        todo:result
      })
    })
  }

  return (
    <div>
      <h1 className="container text-center my-4">Add Todos</h1>
      <form className="container" style={{maxWidth:"500px"}}>
        <div className="my-4">
            <input type="text" className="form-control" id="enterPass" value={text} onChange={(e)=>{setText(e.target.value)}}/>
        </div>
        <div className='text-center'>
            <button type="submit" className="btn btn-primary" onClick={(e)=>addTodo(e)}>Add</button>
        </div>
        </form>

        {
          <ul className="list-group container my-4">
            {
              todoarr.map(todo=>{
                return <li className="list-group-item" key={todo}>{todo} <button style={{float: "right"}} onClick={()=>deleteTodo(todo)}>Delete</button></li>
              })
            }
        </ul>
        }
    </div>
  )
}
