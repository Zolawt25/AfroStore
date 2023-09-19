import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios, * as others from 'axios';
import Loading from './Loading'
import Heart from './Heart';



const HomeProducts = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

useEffect(()=>{
  const getProducts = async ()=>{
    try {
      setLoading(true)
      const res = await axios.get("http://localhost:5000/item/products?sort=-createdAt")
      setProducts(res.data.product)
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }
  getProducts()
},[]) 
if (loading) {

  return <div className='loading-div'>
      <Loading />
    </div>
}
  return (
    <div className='homeProduct'>
        <div className='homeProductItems'>
            {products.map((item, index) => {
              return (
                <div className='homeProductItem' key={item.id}>
                    <Link to={`/product/${item._id}`}>
                        <img src={item.img[0]} alt={item.title} className='imgg'/>
                    </Link>
                    <p>{item.title}</p>
                    <h6>ETB {item.price}</h6>
                    <Heart id={item._id}/>
                </div>
              )
              })}
        </div>
    </div>
  )
}

export default HomeProducts
