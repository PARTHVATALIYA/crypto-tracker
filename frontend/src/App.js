import React from "react";
import CryptoCurrency from "./components/CryptoCurrency/CryptoCurrency";

import "./App.css"
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar/> */}
          <Routes>
              <Route  path="/" element={<Register className='invisible'/>}/>
              <Route  path="/Home" element={<CryptoCurrency />}/>
              <Route  path="/SignIn" element={<Login />}/>


          
          </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
