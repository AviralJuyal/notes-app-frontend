import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import NotesContext from '../context/notes/NotesContext'

const Home = () => {
    const [formData, setFormData] = useState({title:'' , description:'' , tag:''})
    const [eformData, seteFormData] = useState({eid:'',etitle:'' , edescription:'' , etag:''})
    const context = useContext(NotesContext);
    const {notes , addNote , getNote , editNote} = context;
    const userToken = window.localStorage.getItem('userToken');
    const navigate = useNavigate();
    // console.log(formData);

    useEffect(() => {
      if(userToken){
        getNote();
      }
      else
        navigate('/');
    }, [userToken, getNote,navigate ])

    const handleEdit=(n)=>{
    
        ref.current.click();
        // console.log(n)
        seteFormData({eid:n._id,etitle:n?.title , edescription:n?.description , etag:n?.tag})
      }

      const handleSave =(e)=>{
        e.preventDefault();
        editNote(eformData.eid, eformData.etitle , eformData.edescription , eformData.etag);
        refClose.current.click();
      }
    
    const handleChange =(e)=>{
        setFormData({...formData , [e.target.name]: e.target.value});
    }

    const handleeChange =(e)=>{
        seteFormData({...eformData , [e.target.name]: e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        addNote(formData.title , formData.description,formData.tag)
        setFormData({title:'' , description:'' , tag:''})
    }

    const handleLogout = ()=>{
      window.localStorage.removeItem('userToken');
      // window.location ='/';
      navigate('/');

    }

const ref = useRef(null);
const refClose = useRef(null);


  return (<>
          <button className='m-2 btn btn-danger text-light' onClick={handleLogout}>logout</button>
    <div className='d-flex flex-column'>
        <div className="container notesArea">
    <div className="row">
            <h1>Notes app</h1>
    </div>
 
    <div className="row input-container">
            <div className="col-xs-12">
                <div className="styled-input wide">
                    <input type="text" name='title' value={formData.title} onChange={handleChange} required />
                    <label>Title</label> 
                </div>
            </div>
            <div className="col-md-6 col-sm-12">
                <div className="styled-input">
                    <input type="text" name='tag' value={formData.tag} onChange={handleChange} required />
                    <label>Tag</label> 
                </div>
            </div>
            
            <div className="col-xs-12">
                <div className="styled-input wide">
                    <textarea name='description' value={formData.description} onChange={handleChange} required></textarea>
                    <label>Description</label>
                </div>
            </div>
            <div className="col-xs-12">
                <div className="btn-lrg submit-btn" onClick={handleSubmit}>Add Notes</div>
            </div>
    </div>
        </div>

        <button ref={ref} type="button" id='btnModal' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
          <div className="mb-3">
            <label  className="col-form-label">Title:</label>
            <input type="text"  name='etitle' value={eformData?.etitle} onChange={handleeChange} className="form-control" id="recipient-name"/>
          </div>
          <div className="mb-3">
            <label   className="col-form-label">Tag:</label>
            <input type="text" name='etag' value={eformData?.etag} onChange={handleeChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label  name='edescription' className="col-form-label">Description:</label>
            <textarea name='edescription' value={eformData?.edescription} onChange={handleeChange} className="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
      </div>
    </div>
  </div> 
  
</div>

      <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-white my-4'>Your Notes</h1>
        <div className='d-flex container  flex-wrap'>
          {notes.length === 0 && (<div className='text-light' style={{fontSize:'25px'}}>No notes to display</div>)}
            {notes.map(n=>(
                <div key={n._id} className='mx-2'>
                <Card note={n} handleEdit={handleEdit} />
                </div>
                ))}
        </div>
    </div>
    </div>
  </>

  )
}

export default Home