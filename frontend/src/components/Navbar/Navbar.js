import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import fontawe

export default class Navbar extends Component {
  
  render() {
    const {isSignIn, isSignOut} = this.props;
    return (
      <>
      
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <Link className='navbar-brand pe-none text-light fw-bold text-decoration-none text-light ' >Crypto - Currency</Link>
                  <div>
                    <Link className={isSignIn ? 'd-none' : 'text-decoration-none text-light'} to="/">Sign Up</Link>
                    <Link className={isSignIn ? 'd-none' : 'text-decoration-none text-light ps-4'} to="/SignIn">Sign In</Link>
                    {/* <Link to="/profile"><FontAwesomeIcon icon={faUser} className={isSignIn ? 'text-light fs-4 ps-3 ' : 'd-none' } /></Link> */}
                    <Link className={isSignOut ?  'text-decoration-none text-light' : 'd-none' } to="/">Log out</Link>

                  </div>
                  
            </div>
        </nav> 
      </>
    )
  }
}
