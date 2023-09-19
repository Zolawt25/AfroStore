import React, {  useState } from 'react'
import axios, * as others from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from "universal-cookie"
import LoadingPost from '../components/LoadingPost';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const cookie = new Cookie()

      const handleLogin = async (e)=>{
        try {
          e.preventDefault()
          setLoading(true)
         const res = await axios.post("http://localhost:5000/user/login", {email, password})
         setLoading(false)
         cookie.set("token", res.data.token)
         navigate('/')
        } catch (error) {
          setLoading(true)
          setEmailErr(error.response.data.email)
          setPasswordErr(error.response.data.password)
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
            <h2>Login</h2>
            <form>             
                <input type="email" name='email' onChange={(e)=> setEmail(e.target.value)} placeholder='email'/>
                {emailErr && <p>{emailErr}</p>}
                <input type="password" name='password' onChange={(e)=> setPassword(e.target.value)} placeholder='password'/>
                {passwordErr && <p>{passwordErr}</p>}
                <button type='submit' onClick={(e) => { handleLogin(e)}}>{loading ? <p style={{marginLeft: "180px"}}><LoadingPost /></p> : "Login"}</button>
                <a href="/register">don't have an account?</a>

            </form>
          </div>
            
        </div>
      
    </div>
  )
}

export default Login
