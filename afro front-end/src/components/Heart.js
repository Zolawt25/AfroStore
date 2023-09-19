import React, { useState } from 'react'
// import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const Heart = ({id}) => { 

    const [favorite, setFavorite] = useState(false) 

    let fav = JSON.parse(localStorage.getItem("favorite"))
    
    const handleLike = () => {
            setFavorite(!favorite)
            let favorites = JSON.parse(localStorage.getItem("favorite") || "[]")
            favorites.push(id)
            localStorage.setItem("favorite", JSON.stringify(favorites));
         
    }


    const handleDisLike = () => {
            let favorites = JSON.parse(localStorage.getItem("favorite") || "[]")
            let index = favorites.findIndex(productId => productId === id);
            favorites.splice(index, 1);
            setFavorite(!favorite)
            localStorage.setItem("favorite", JSON.stringify(favorites));
            window.location.reload()
        
    }

    
  return (
    <div>
        <button style={{background:'none', border:'none'}} ><span>{favorite || fav && fav.includes(id) ? <Favorite className='fav-icon' onClick={() => handleDisLike()}/> : <FavoriteBorder className='fav-icon' onClick={() => handleLike()}/>}</span></button>
    </div>
  )
}

export default Heart
