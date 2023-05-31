import React,{useState} from 'react'
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [note, setnote] = useState({email:"",password:""});
  const handlechange=(e)=>{
    setnote({...note,   [e.target.id]:e.target.value})
  }
  const handlesubmit= async(e)=>{
    e.preventDefault();
    const email=note.email
    const password=note.password
    // console.log(note.email," ",note.password)
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({email,password}),
          });
        const json=await response.json();
        console.log(json.success);
        if(json.success)
        {
          //redirect
          localStorage.setItem('token',json.authtoken)

          navigate('/');
          
        }
        else
        {
          // alert("invalid cred");
          console.log("invalid cred")
        }

    }
    return (
        
        <div className="conta my-3 py-3">
  
        <MDBContainer fluid className="p-3 my-5 h-custom">
    
          <MDBRow>
    
            <MDBCol col='10' md='6'>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
            </MDBCol>
    
            <MDBCol col='4' md='6'>
    
              <MDBInput wrapperclassname='mb-4' value={note.email} onChange={handlechange} label='Email address' id='email' name='email' type='text'  size="lg"/>
              <MDBInput wrapperclassname='mb-4' value={note.password} onChange={handlechange} label='Password' id='password' name='password' type='password'  size="lg"/>
    
             
    
              <div className='text-center text-md-start mt-4 pt-2'>
              <button type="button" className="btn btn-primary" onClick={handlesubmit}>Sign In</button>
                <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/signup" className="link-danger">Register</Link></p>
              </div>
    
            </MDBCol>
    
          </MDBRow>
    
          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2020. All rights reserved.
            </div>
    
            <div>
    
             
    
            </div>
    
          </div>
    
        </MDBContainer>
        </div>

      );
}

export default Login