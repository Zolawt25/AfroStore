import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Navbarsub from '../components/Navbarsub'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import CallIcon from '@mui/icons-material/Call';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useLocation } from 'react-router-dom';
import axios, * as others from 'axios';
import Loading from '../components/Loading';


const Product = () => {

    const [product, setProduct] = useState([])
    const location = useLocation().pathname.split('/')[2]
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getProducts = async ()=>{
          try {
            setLoading(true)
            const res = await axios.get(`http://localhost:5000/item/product/${location}`)
            setProduct([res.data.product])
            setLoading(false)
          } catch (error) {
            setLoading(true)
            alert("sorry something went wrong")
            setLoading(false)
          }
        }
        getProducts()
      },[location])

  return (
    <div className='product-parent'>
        <Navbar />
        <Navbarsub />
            { loading ? <div className='loading-div'><Loading/></div> :
                product.map((item, index)=>{
                    const {title, price, description, location, img, phone} = item
                    return(
                        <div className='product-container' key={index}>
                        <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => console.log()}
                                onSlideChange={() => console.log()}
                                >
                                {
                                    img.map((item, index)=>(
                                        <SwiperSlide key={index}><img src={item} alt={item} /></SwiperSlide>
                                        ))
                                    }
                            </Swiper>

                            <div className='sub-product-container'>
                                <h2>{title}</h2>
                                <br/>
                                <p>Price: {price} ETB</p>
                                <span >Location: {location}</span>
                                <br/><br/>
                                <h4>Description:</h4>
                                <h5>
                                    {description}
                                </h5>
                                <button><CallIcon fontSize='small' style={{position:'relative', top:'5px', right:'10px'}}/>{phone}</button>
                            </div>
                        </div>
                    )
                })
            }
    </div>
  )
}

export default Product
