import React ,{useContext,useState}from 'react'
import noteContext from '../context/notes/noteContext'
import Home from './Home';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function ActualHome() {
  const navigate=useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      navigate('/login')
    }

  }, [])
  
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note, setnote] = useState({title:"",description:"",tag:""});

    const handlechange=(e)=>{
        setnote({...note,   [e.target.id]:e.target.value})
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        {note.tag=note.tag===""?note.tag="General":note.tag}
        addNote(note);
        setnote({title:"",description:"",tag:"General"});
    }


  return (
    <>
    <div className="container d-flex justify-content-center " style={{"width":"75vw"}}>
    <div className="con py-3" style={{"marginTop":"5rem"}}>
        <h1>Add a new note</h1>
    <form>
  <div className="form-group my-3">
    <label htmlFor="exampleInputEmail1">Title</label>
    <input type="text" className="form-control" id="title" name="title"  aria-describedby="emailHelp" placeholder="Enter Title" minLength={1} onChange={handlechange} value={note.title}/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputPassword1 my-3">Description</label>
    <input type="text" className="form-control" id="description" name="description" placeholder="Enter Description" value={note.description} onChange={handlechange}/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputPassword1 my-3">tag</label>
    <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter tag" value={note.tag} onChange={handlechange}/>
  </div>
  
  <div className="cont d-flex align-items-center">

  <button disabled={note.title.length<1?true:false} type="submit" className="btn btn-primary d-flex align-items-center " onClick={handlesubmit}>Submit</button>
  </div>
</form>
    </div>
    </div>
   <Home/>
   
    
    </>
  )
}

export default ActualHome