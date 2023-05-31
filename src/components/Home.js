import React,{useContext,useState, useEffect,useRef} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    const context=useContext(noteContext);
    const {notes,setNotes,getNotes,editNote}=context;
    const [noteid,setnoteid]=useState("");
    const refClose=useRef(null)
    
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""});
    const handlechange=(e)=>{
        setnote({...note,   [e.target.id]:e.target.value})
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        console.log(note)
        {note.tag=note.tag===""?note.tag="General":note.tag}
        note.etitle.length>=1&&editNote(noteid,note.etitle,note.edescription,note.etag)
                setnote({id:"",etitle:"",edescription:"",etag:""});
                refClose.current.click();

    }

    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
    
    navigate('/login');
  
        }
    getNotes()
},[])
const editIcon=async (currentNote)=>
{

    reff.current.click();
    // console.log(currentNote._id);
    // console.log("home",noteid);
    // setnoteid(currentNote.id)
    // // console.log("edit")
    setnote({id:noteid,etitle:currentNote.title, edescription: currentNote.description,etag:currentNote.tag})
}
const handleclose=()=>{
    refClose.current.click();
}
const reff=useRef(null)

return (
        <>
<button type="button" ref={reff} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{"display":"none"}}>
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <div className="form-group my-3">
    <label htmlFor="exampleInputEmail1">New Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle"  aria-describedby="emailHelp" placeholder="Enter Title" minLength={1} onChange={handlechange} value={note.etitle} required/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputPassword1 my-3">New Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter Description" value={note.edescription} onChange={handlechange}/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputPassword1 my-3">New Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" placeholder="Enter tag" value={note.etag} onChange={handlechange}/>
  </div>     
   </div>

      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary btn-sm" data-bs-dismiss="modal" onClick={handleclose}>Close</button>
        <button type="button" className="btn btn-primary btn-sm" onClick={handlesubmit}>Update</button>
      </div>
    </div>
  </div>
</div>

        <div className="container" style={{"marginTop":"5rem","paddingLeft":"5rem","paddingRight":"5rem"}}>
            <div className="d-flex justify-content-center">
            <h1>My Notes</h1>

            </div>
            <div className="con d-flex" style={{"overflow":"auto"}}>
            <div className=" d-flex" style={{"overflow":"auto"}}>
                {notes.length===0&&<div><h1>You don't have any notes</h1></div>}
            {notes.map((note)=>
            {return <NoteItem key={note._id} note={note} noteid={noteid} setnoteid={setnoteid} editIcon={editIcon} title={note.title} tag={note.tag} description={note.description} date={note.date} _id={note._id}/>  } )}
            </div>
            </div>
           
            
        </div>



</>

      )
}

export default Home