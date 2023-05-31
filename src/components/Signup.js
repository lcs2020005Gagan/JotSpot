import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Signup() {
    const navigate = useNavigate();
  const [note, setnote] = useState({email:"",password:"",name:"",repeatpassword:""});
  const handlechange=(e)=>{
    setnote({...note,   [e.target.name]:e.target.value})
  }
  const handlesubmit= async(e)=>{
    e.preventDefault();
    const email=note.email
    const name=note.name
    const password=note.password
    // console.log(note.email," ",note.password)
        const response=await fetch("http://localhost:5000/api/auth/createuser",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({name,email,password}),
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
        <div style={{"marginTop":"5rem"}}>
        <MDBContainer fluid>
    
          <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
    
                  <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
    
                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size='lg'/>
                    <MDBInput name='name' label='Your Name' id='form1' type='text' value={note.name}  onChange={handlechange} className='w-100'/>
                  </div>
    
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg'/>
                    <MDBInput name='email' label='Your Email' id='form2' value={note.email}  onChange={handlechange} type='email'/>
                  </div>
    
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg'/>
                    <MDBInput name='password' label='Password' id='form3' value={note.password}  onChange={handlechange} type='password'/>
                  </div>
    
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size='lg'/>
                    <MDBInput name='repeatpassword' label='Repeat your password' id='form4' onChange={handlechange} value={note.repeatpassword} type='password'/>
                  </div>
        
                  <button type="button" className="btn btn-primary" onClick={handlesubmit}>Sign In</button>
    
                </MDBCol>
    
                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                  <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                </MDBCol>
    
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
    
        </MDBContainer>
        </div>
      );
    }
    


export default Signup