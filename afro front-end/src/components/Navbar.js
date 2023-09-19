import React, { useState } from 'react'
import bz from '../img/bz.png'
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom'
import Cookie from "universal-cookie"
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const decode = document.cookie? jwtDecode(document.cookie.split('=')[1]) : ""
  const cookie = new Cookie()
  const [visible, setVisible] = useState(false)
  const [toggle, setToggle] = useState(false)
  const name = document.cookie && decode.name.slice(0,2)

  const handlePop = () => {
    setVisible(!visible)
  }

  const logout = ()=>{
    cookie.remove("token")
    window.location.reload()
  }
  return (
    <header>
      <div className='navbar-logo'>
        <a href="/">
          <img src={bz} alt="bz" className='navbar-img'/>
        </a>
      </div>

      <div className='navbar-links' style={{top: `${toggle ? "69px" : "-200px"}`}}>
        <a href="/">Home</a>
        <a href="#about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/favorites">Favorites</a>
        
      </div>

      <div className='navbar-button'>
        <Link to={document.cookie? `/post` : "/login"}>
          <button className='login-button'>POST</button>
        </Link>
        {
          document.cookie?<button className='profile' onClick={()=> handlePop()}>{name}</button> 
          : <Link to="/login"><button className='login-button'>Login/Register</button></Link>  
        }
        <div className='navIcon'  onClick={()=> {setToggle(!toggle)}}><MenuIcon /></div>
              
      </div>
        {visible && <div className='popup'>
          <button className='login-button'><a href="/uploads">Uploads</a></button>
          <button className='login-button' onClick={logout}>Logout</button>
        </div>}
        

      
    </header>
  )
}

export default Navbar
