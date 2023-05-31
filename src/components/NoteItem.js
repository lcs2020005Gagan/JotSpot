import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const date1 = props.date;
const date2 = Date.now().toGMTString
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
const context=useContext(noteContext);
const {deleteNote}=context

const handleOnClick=(e)=>{
e.preventDefault();
deleteNote(props._id);
}

const setss=(e)=>{
  // console.log(props._id)
props.setnoteid(props._id);
console.log(props.noteid)
props.editIcon()
}
  return (

   <>
   <div style={{"minWidth":"15rem","display":"flex","overflowWrap":"breakWord"}}>
   <div className="card text-center  mx-2 my-2">
    <div className="card-body ">
       <h5 className="card-title">{props.title}</h5>
  </div>
  <div className="card-footer text-muted">
    
    <p className="card-text">{props.description}</p>
  </div>
  <div className="card-footer text-muted">
    {props.tag}
  </div>
  <div className="card-footer text-muted">
    {props.date}
  </div>
  <div className="card-footer text-muted d-flex justify-content-center align-items-center">
    <i className="fa-solid fa-trash mx-3" onClick={handleOnClick}></i>
    <i className="fa-solid fa-pen-to-square mx-3" onClick={setss} ></i>

    
        </div>

</div>
</div>
   </>
  )
}

export default NoteItem