import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-container'>

      <div className='footer-aboutUs'> 
          <h4 id='about'>About Us</h4>
        <p>
          AfroStore.com is a website that focuses on Ethiopian Classified Ads and Jobs in Ethiopia. It provides a platform for sellers to advertise their products online for sell or rent. All data and information provided on this site is for informational purposes only.
        </p>
      </div>

      <div className='footer-categories'>
        <h4>Categories</h4>
        <ul>
          <li><a href="/category?category=phone">Phones</a></li>
          <li><a href="/category?category=laptop">Laptops</a></li>
          <li><a href="/category?category=tv">TV</a></li>
        </ul>

        <ul>
          <li><a href="/category?category=game">Games</a></li>
          <li><a href="/category?category=vehicle">Vechiles</a></li>
          <li><a href="/category?category=fashion">Fashion</a></li>
        </ul>
      </div>

      <div className='footer-categories'>
      <h4>Links</h4>
      <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#search">Search</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </div>
      </div>
      <footer>© 2023 AfroStore.com.et Gibraltar</footer>
    </div>
  )
}

export default Footer
