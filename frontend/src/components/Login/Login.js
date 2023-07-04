import axios from 'axios';
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';

export default class Login extends Component {

    constructor(){
        super();
        this.state = {
            
            email:'',
            password:'',
            redirect:false,
            isSignIn:false
        }
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    SignIn= async ()=>{
        const {email,password} = this.state;
        if(email && password){
            try {
                await axios.post("http://localhost:5000/SignIn", {email, password});
                alert("SignIn Successfully!")
                this.setState({isSignIn:true, redirect: true})
            } catch (error) {
                alert("User not Registered!")
            }
        }
        else{
            alert("Invalid Input")
        }
    }

  render() {
    
    return (
        <>
       
            <Navbar isSignIn={this.state.isSignIn}  />
            {(!this.state.redirect && <div className='d-flex justify-content-center pt-5'>
                <div className='form d-flex justify-content-center flex-column'>
                    <h1>SingIn</h1>
                    <input type="email" name='email' value={this.state.email}placeholder='Enter Your Email'  onChange={this.handleChange}/>
                    <input type="password" name='password' value={this.state.password} placeholder='Enter Password'  onChange={this.handleChange}/>
                    <div className="button" onClick={this.SignIn }>Sign In</div>
                </div>
            </div>) || (this.state.redirect && <Navigate to="/Home" replace></Navigate>)}
        </>
        
    )
  }
}
