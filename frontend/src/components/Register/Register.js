import React, { Component } from 'react'
import "./Register.css"
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';

export default class Register extends Component {

    constructor(){
        super();
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            number:'',
            password:'',
            correctPassword:'',
            redirect:false,
            registered:false

        }
    }

    handleChange=(event)=>{
        this.setState({
          [event.target.name]:event.target.value
        });
    }

    register= async ()=>{
      const {firstName , lastName , email, number, password, correctPassword} = this.state;
      if(firstName && lastName && email && number && password && correctPassword && password===correctPassword){
        let symbol=0, dot=0, psw=true, number=0, symbol1=0, cap=0, sml=0;
        for(var i=0;i<this.state.email.length;i++){
          if(this.state.email[i]==='@' && this.state.email.length - i > 0 && this.state.email[i+1]!=='.'){
            symbol++;
          }
          else if(this.state.email[i]==='.' && this.state.email.length - i >0){
            dot++;
          }
        }
       
        for( i=0;i<this.state.password.length;i++){
          if(this.state.password.length<8){
            psw=false;
            alert("Password must contain 8 character")
          }
          else if(this.state.password[i]>=0 && this.state.password[i]<=9){
            number++;
            alert("Password must contain 0-9 number")
          }
          else if(this.state.password[i]==='!' && this.state.password[i]==='@' && this.state.password[i]==='#' && this.state.password[i]==='$' && this.state.password[i]==='%' && this.state.password[i]==='^' && this.state.password[i]==='&' && this.state.password[i]==='*' && this.state.password[i]==='(' && this.state.password[i]===')'){
            symbol1++;
            alert("Password must contain symbol")

          }
          else if(this.state.password[i]>='A' && this.state.password[i]<='Z'){
            cap++;
            alert("Password must contain A-Z character")

          }
          else if(this.state.password[i]>='a' && this.state.password[i]<='z'){
            sml++
            alert("Password must contain a-z character")
          }
          
        }
        if(symbol===1 && dot>0 ){
          try{
            await axios.post("http://localhost:5000/",this.state)
            alert("Registered Successfully!")
            this.setState({redirect: true, registered: true})
          }
          catch(error){
            alert("User Already Registred");
          }
        }
        else{
          alert("Enter valid Email");
        }

        
      }
      else{
        alert("Invalid Input")
      }
    }


  render() {
    if(this.state.redirect){
      return <Navigate to="/Home" replace />;
    }
    return (
      <>
      <Navbar isSignIn={this.state.registered}/>
      
        {(!this.state.redirect && <div className='d-flex justify-content-center pt-5'>
          <div className='form d-flex justify-content-center flex-column'>
              <h1>login</h1>
              <input type="text" name='firstName' value={this.state.firstName}placeholder='Enter Your first name'  onChange={this.handleChange}/>
              <input type="text" name='lastName' value={this.state.lastName}placeholder='Enter Your last name'  onChange={this.handleChange}/>
              <input type="email" name='email' value={this.state.email} placeholder='Enter Your email' onChange={this.handleChange} required/>
              <input type="text" name='number' value={this.state.number} placeholder='Enter Your Mobile Name'  onChange={this.handleChange}/>
              <input type="password" id='password' name='password' value={this.state.password} placeholder='Enter Password'  onChange={this.handleChange}/>
              <input type="Password" name='correctPassword' value={this.state.correctPassword} placeholder='Re-Enter Password'  onChange={this.handleChange}/>
              <div className="button" onClick={this.register }>Register</div>
              
            </div>
        </div>) || (this.state.redirect && <Navigate to="/Home" replace></Navigate>)}
      </>
    )
  }
}
