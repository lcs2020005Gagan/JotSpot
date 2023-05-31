import React,{useContext,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
    const a=useContext(noteContext);
  return (
    <div style={{"marginTop":"5rem"}}>
        <h1>hello {a.name}
    </h1></div>
  )
}

export default About