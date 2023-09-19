import React from 'react'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <a href='/category?category=phone' className='sidebar-category' >
        <img src="./image/phones.png" alt="phones" />
        <p><b>Phones</b> </p>
      </a>
      <a href='/category?category=laptop' className='sidebar-category' >
        <img src="./image/laptops.png" alt="phones" />
        <p><b>Laptops</b> </p>
      </a>
      <a href='/category?category=tv' className='sidebar-category' >
        <img src="./image/tv.png" alt="phones" />
        <p><b>TV</b> </p>
      </a>
      <a href='/category?category=game' className='sidebar-category' >
        <img src="./image/video-games.png" alt="phones" />
        <p><b>Games</b> </p>
      </a>
      <a href='/category?category=vehicle' className='sidebar-category' >
        <img src="./image/cars.png" alt="phones" />
        <p><b>Vehicle</b> </p>
      </a>
      <a href='/category?category=fashion' className='sidebar-category'>
        <img src="./image/watches.png" alt="phones" />
        <p><b>Fashion</b> </p>
      </a>
    </div>
  )
}

export default Sidebar
