import React from 'react'
import Navbar from '../components/Navbar'
import Navbarsub from '../components/Navbarsub'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <div className='contact-container'>
        <Navbar />
        <Navbarsub/>
        <h2>Contact Us</h2>
        <div className='contact-wrapper'>
            <div className='contact-img'> 
                <img src="./image/FAQ.png" alt="" />
            </div>
            <p>AfroStore customer support team is always ready to answer your questions and provide all the necessary assistance.</p>
            <p>AfroStore.com customer care department - you can email your questions, suggestions, and comments at support@AfroStore.com.et.</p>
            <p>If you found any bugs or have security-related questions, please get in touch with our team at security@AfroStore.com</p>
            <div className='contact-btn'>
                <a href="/">
                    <button>Return To Home</button>
                </a>
            </div>
        </div>
        <div className='contact-footer'>
            <Footer/>
        </div>
    </div>
  )
}

export default Contact
