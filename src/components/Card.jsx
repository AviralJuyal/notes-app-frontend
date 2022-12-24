import React, { useContext} from 'react'
import NotesContext from '../context/notes/NotesContext';

const Card = (props) => {
  const context = useContext(NotesContext);
    const { delNote } = context;
    const handleDel=(id)=>{
      delNote(id);
    }

  return (
   <>

  <div className="card m-2 pb-3 bg-dark text-light" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{props.note.title}</h5>
    <p className="card-text">{props.note.description}</p> 
    <p>TAG : {props.note.tag}</p>
  </div>
  <div className='container'>
    <button onClick={()=>props.handleEdit(props.note)} className='btn mx-2 btn-primary'><i className="bi bi-pen-fill"></i></button>
    <button onClick={()=>handleDel(props.note._id)} className='btn mx-2 btn-danger'><i className="bi bi-trash-fill"></i></button>
  </div>
</div>

   </>
  )
}

export default Card