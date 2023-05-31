import react,{useState} from "react"

import NoteContext from "./noteContext"
const NoteState =(props)=>{
    const date = new Date();
    const host="http://localhost:5000"
      
     const strdate=date.toString()
        const initialNotes=[]
  const [notes, setNotes] = useState(initialNotes)

  
  
//get all notes
//addnote
const getNotes=async ()=>{
  //  console.log("inside getnotes");
 
    const response=await fetch(`${host}/api/notes/fetchnotes`,{
        method: 'GET',
        headers: {
          "auth-token": localStorage.getItem('token')
        },
      });


      const json=await response.json();
// console.log(json);
setNotes(json);

}



//addnote
const addNote=async (newNote)=>{

    const title=newNote.title;
    const description=newNote.description
    const tag=newNote.tag
    const response=await fetch(`${host}/api/notes/addnote`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });

      const json=await response.json()
    const noteToAdd=json
setNotes(notes.concat(noteToAdd));
console.log(notes);
}

//deleteNote
const deleteNote=async  (id)=>{
  //api call
  const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
  });
const json=response.json();
//logic
    const newNote=notes.filter((note)=>{
        return note._id!==id
    })
    setNotes(newNote);
}


//editNote
const editNote=async (id,title,description,tag)=>
{
   
    // console.log("inside editnote");
    const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
    const json=response.json();

    let newNote=JSON.parse(JSON.stringify(notes));
    for(let index=0;index<newNote.length;index++)
    {
        const element=newNote[index];
        if(element._id===id)
        {
            newNote[index].title=title;
            newNote[index].description=description;
            newNote[index].tag=tag;
            break;
        }
    }
    setNotes(newNote);
}

    return(
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;