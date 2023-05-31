import './App.css';
import Navbar from './components/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import ActualHome from './components/ActualHome';
import NoteState from './context/notes/NoteState';
import noteContext from './context/notes/noteContext';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alerts from './components/Alerts';

function App() {
  const [alert,setAlert]=useState(null)
  const showAlert=(message,type)=>{
  setAlert({
      msg:message,
      type:type
  })
  setTimeout(()=>{
    setAlert(null);
  },1500)
}


  return (
    <>  
    <NoteState>
    <BrowserRouter>

    
    <Navbar />
    <Alerts alert={alert}/>
    <Routes>
    <Route exact path="/" element= <ActualHome showAlert={showAlert}/> />
    <Route exact path="/home" element= <Home/> />
    <Route exact path="/about" element= <About/> />
    <Route exact path="/login" element= <Login/> />
    <Route exact path="/signup" element= <Signup/> />
        </Routes>
    
   
    </BrowserRouter>
    </NoteState>
    </>

  );
}

export default App;
