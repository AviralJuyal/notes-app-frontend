import React, { useState } from 'react';
import NotesContext from './NotesContext';

const NotesState = (props) => {
  const host = 'http://localhost:8080/';
   const notesInitial = [];
   const [notes, setNotes] = useState(notesInitial);
   const userToken = window.localStorage.getItem('userToken');

   const getNote =async()=>{
    const res = await fetch(`${host}api/notes/getnotes` , {
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                "auth-token" : userToken,
            },
            });
        const result  = await res.json();
        console.log(result);
        setNotes(result);
   }

   const addNote=async(title , description , tag)=>{
    console.log(description)
    const res = await fetch(`${host}api/notes/addnotes` , {
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "auth-token" : userToken,
            },
            body : JSON.stringify({title , description , tag})
            });

        const result  = await res.json();
        console.log(result);
        if(!result.errors)
        setNotes(notes.concat(result));
   }

   const delNote=async(id)=>{
    console.log(id)
    const res = await fetch(`${host}api/notes/deletenotes/${id}` , {
      method:'DELETE',
      headers:{
          "Content-Type": "application/json",
          "auth-token" : userToken,
      },
      });
      const response = await res.json();
      console.log(response)
      setNotes(notes.filter(n=>n._id !== id));
   }

   const editNote=async(id , title , description , tag)=>{
    console.log(id)
    let newNotes = JSON.parse(JSON.stringify(notes))
    // console.log(newNotes)
    newNotes.forEach((n)=>{
      if(n._id === id){
        n.title = title;
        n.description = description;
        n.tag = tag;
        console.log(n);
        
      }
    })
    setNotes(newNotes);

    const res = await fetch(`${host}api/notes/editnotes/${id}` , {
      method:'PUT',
      headers:{
          "Content-Type": "application/json",
          "auth-token" : userToken,
      },
      body : JSON.stringify({title , description , tag})
      });
      const response = await res.json();
      console.log(response);
      
   }

  return (
    <NotesContext.Provider value={{notes , addNote , delNote , editNote ,getNote}}> 
        {props.children}
    </NotesContext.Provider>
  )
}

export default NotesState