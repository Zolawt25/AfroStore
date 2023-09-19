import React, { useState } from 'react'
import axios, * as others from 'axios';
import Cookie from "universal-cookie"
import { useNavigate } from 'react-router-dom'
import LoadingPost from '../components/LoadingPost';


const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [loading, setLoading] = useState(false)
  const cookie = new Cookie()
  const navigate = useNavigate()

  const handleRegister = async(e)=>{
    try {
      e.preventDefault()
      setLoading(true)
     const res = await axios.post("http://localhost:5000/user/register", {name, email, password})
     setLoading(false)
     cookie.set("token", res.data.token)
     navigate('/')
    } catch (error) {
        setLoading(true)
        setEmailErr(error.response.data.email)
        setLoading(false)
    }
  }
  return (
    <div className='login-container'>
    <div className='login-wrapper'>
      <div className='login-left'>
        <img src="/image/118264.png" alt="aaaa" />
      </div>
      <div className='login-right'>
        <img src="/image/user.png" alt="aaa" />
        <h2>Sign Up</h2>
        <form>             
            <input type="text" name='name' onChange={(e)=> setName(e.target.value)} placeholder='username'/>

            <input type="email" name='email' onChange={(e)=> setEmail(e.target.value)} placeholder='email'/>
            {emailErr && <p>{emailErr}</p>}

            <input type="password" name='password' onChange={(e)=> setPassword(e.target.value)} placeholder='password'/>  

            <button type='submit' onClick={(e) => { handleRegister(e)}}>{loading ? <p style={{marginLeft: "180px"}}><LoadingPost /></p> : "Register"}</button>
            <a href="/login">already have an account?</a>

        </form>
      </div>
        
    </div>
  
</div>
  )
}

export default Register
