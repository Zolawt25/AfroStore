import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Navbarsub from '../components/Navbarsub'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Search from "../components/Search"
import axios, * as others from 'axios';
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import jwtDecode from 'jwt-decode';
import { Delete, Edit } from '@mui/icons-material'

const Uploads = () => {
  const decode = document.cookie? jwtDecode(document.cookie.split('=')[1]) : ""
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const fetchData = async ()=>{
      setLoading(true)
      const res = await axios.get(`http://localhost:5000/item/products`)
      setProducts(res.data.product)
      setLoading(false)
    }
    fetchData()
  },[])

  const handleDelete = async(id)=>{
    await axios.delete(`http://localhost:5000/item/product/${id}`)
    window.location.reload()
  }

   const pro = products.filter((item)=>{
    if(item.createdBy === decode.userId){
        return item
    }
     })
  return (
    <div>
      <Navbar/>
      <Navbarsub/>
      <Search/>
      <Sidebar/>
      {loading ? <div className='loading-div'><Loading/></div> :
        <div className='homeProduct'>
        <div className='homeProductItems'>
            {pro.map((item) =>{ 
              return (
              <div key={item._id} className='homeProductItem'>
              <Link to={`/product/${item._id}`}>
                <img src={item.img[0]} alt={item.title} className='imgg'/>
              </Link>
                <p>{item.title.substring(0, 30)}</p>
                <h6>ETB {item.price}</h6>
                <div className='upload-icons'>
                  <Link to={`/edit/${item._id}`}> 
                    <Edit style={{color: 'green'}} />
                  </Link>
                  <Delete style={{color:'red'}} onClick={()=> handleDelete(item._id)}/>
                </div>
            </div>)
            })}
          {pro.length === 0 && <div className='loading-divs'><h2>You haven't uploaded anything yet</h2></div>}
        </div>
    </div>
    }
      <Footer/>
    </div>
  )
}

export default Uploads
