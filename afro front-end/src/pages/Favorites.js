import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Navbarsub from '../components/Navbarsub'
import Sidebar from '../components/Sidebar'
import HomeProducts from '../components/HomeProducts'
import Footer from '../components/Footer'
import Search from "../components/Search"
import { Link } from 'react-router-dom'
import { Delete } from '@mui/icons-material'
import axios, * as others from 'axios';
import Heart from '../components/Heart'


const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorite"))

  const [products, setProducts] = useState([])
  useEffect(()=>{
    const getProducts = async ()=>{
      try {
        // setLoading(true)
        const res = await axios.get("http://localhost:5000/item/products")
        setProducts(res.data.product)
        // setLoading(false)
      } catch (error) {
        console.error(error);
      }
    }
    getProducts()
  },[]) 


  const clearAll = ()=>{
    localStorage.clear("favorite")
    window.location.reload()
  }

  return (
    <div>
       <Navbar />
      <Navbarsub />
      <Search />
      <Sidebar/>

      <div className='homeProduct'>
            <h2 className='searchPage-result' style={{display:'flex',justifyContent:'space-between'}}>Your Favorites<button onClick={()=>clearAll()} className='clear-btn'>Clear All</button></h2><br/><br/>
            
            <div className='homeProductItems'>
          {!favorites || favorites.length === 0 && <div className='loading-divs'><h2>NO FAVORITES</h2></div>}
          {!favorites && <div className='loading-divs'><h2>NO FAVORITES</h2></div>}
            
          {products.map((item)=> {   
            const {title, _id, price, img} = item   
            return (
              favorites && favorites.includes(_id) &&
                    <div key={_id} className='homeProductItem'>
                  <Link to={`/product/${_id}`}>
                      <img src={img[0]} alt={title} className='imgg'/>
                  </Link>
                      <p>{title}</p>
                      <h6>ETB {price}</h6>
                      <Heart id={_id}/>
                      {/* <button onClick={()=> handleDelete(_id)} ><Delete/></button> */}
                  </div>
            )
          })}
          </div>

    </div>
      <Footer />
    </div>
  )
}

export default Favorites
