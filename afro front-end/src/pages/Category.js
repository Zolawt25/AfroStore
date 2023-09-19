import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Navbarsub from '../components/Navbarsub'
import Sidebar from '../components/Sidebar'
// import HomeProducts from '../components/HomeProducts'
import Footer from '../components/Footer'
import Search from "../components/Search"
import axios, * as others from 'axios';
import { Link, useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import Heart from '../components/Heart'


const Category = () => {
  const [category, setCategory] = useState([])
  const location = useLocation().search.split("=")[1]
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(false)

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:5000/item/products?category=${location}&sort=-createdAt`)
        setCategory(res.data.product)
        setCount(res.data.count)
        setLoading(false)
      } catch (error) {
        setLoading(true)
        alert("sorry something went wrong")
        setLoading(false)
      }
     
    }
    fetchData()
  },[location])
  // if (loading) {
  //   return <Loading />
  // }
  return (
    <div>
      <Navbar/>
      <Navbarsub/>
      <Search/>
      <Sidebar/>
      {loading ? <div className='loading-div'><Loading/></div> :
        <div className='homeProduct'>
            <h2 className='searchPage-result'>Category: {location}s ({count})</h2><br/><br/>
            {category.length === 0 && <div className='loading-divs'><h2>Nothing Found</h2></div>}
            <div className='homeProductItems'>
                {category.map((item) => (
                <div key={item._id} className='homeProductItem'>
                <Link to={`/product/${item._id}`}>
                    <img src={item.img[0]} alt={item.title.substring(0, 30)} className='imgg'/>
                </Link>
                    <p>{item.title}</p>
                    <h6>ETB {item.price}</h6>
                    <Heart id={item._id}/>
                </div>
                ))}
            </div>
    </div>
    }
      <Footer/>
    </div>
  )
}

export default Category
