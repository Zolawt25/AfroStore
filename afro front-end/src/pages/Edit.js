import React, { useEffect, useState } from 'react'
import Navbarsub from '../components/Navbarsub'
import Navbar from '../components/Navbar'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import jwtDecode from 'jwt-decode';
import app from '../firebase';
import axios, * as others from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingPost from '../components/LoadingPost';
import Footer from '../components/Footer';

const Edit = () => {
  const decode = document.cookie? jwtDecode(document.cookie.split('=')[1]) : ""
  const id = useLocation().pathname.split("/")[2]
  const [getValues, setGetValues] = useState([])
  const [values, setValues] = useState({
    title:``,
    price:``,
    description:``,
    location:``,
    category:``,
    phone:``,
    img:[]
  })
  const [imageFile, setImageFile] = useState([])
  const [img, setImg] = useState([])
  const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)
  const [prog, setProg] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]:value})
  }
  const handleFileChange = (e)=>{
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i]
      newImage["id"] = Math.random();
      setImageFile((prev) => [...prev, newImage])
    }
  }

  const handleSubmit = () => {
    const promises = []

    {imageFile.map((image) => {
      const fileName = new Date().getTime() + image.name
      const storage = getStorage(app);
  const storageRef = ref(storage, `images/${fileName}`);
  
  const uploadTask = uploadBytesResumable(storageRef, image);
  promises.push(uploadTask)
  
  
  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setProgress(progress)
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
          default:
      }
    }, 
    (error) => {
    }, 
    async() => {
      await  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImg((prev) => [...prev, downloadURL])
      });
    }   
    );
    })}

    Promise.all(promises)
    setProg(true)
}

  const post = async(e)=>{
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5000/item/product/${id}`, {...values,
       img: img.length === 0 ? getValues.img : img,
       title: !values.title ? getValues.title : values.title,
       price: !values.price ? getValues.price : values.price,
       description: !values.description ? getValues.description : values.description,
       location: !values.location ? getValues.location : values.location,
       category: !values.category ? getValues.category : values.category,
       phone: !values.phone ? getValues.phone : values.phone,
       createdBy: decode.userId
    })
      navigate("/uploads")
    } catch (error) {
      setError(true)
      console.error(error);
    }
  }
  const newProgress = Math.floor(progress)
  useEffect(()=>{
    const fetchValues = async ()=>{
        const res = await axios.get(`http://localhost:5000/item/product/${id}`)
        setGetValues(res.data.product)
    }
    fetchValues()
}, [])
  return (
    <div>
      <Navbar/>
      <Navbarsub/>
      <div className='post-container'>
        <form>
          <div className='post-category'>
            <div className='sub-post-category'>
              <h4>Category</h4>
              <select onChange={(e)=> handleChange(e)} name='category'>
                  <option value={getValues.category}>{getValues.category}</option>
                  <option value="phone">Phone</option>
                  <option value="laptop">Laptop</option>
                  <option value="tv">Tv</option>
                  <option value="game">Game</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="fashion">Fashion</option>
              </select>
              {error && values.category.length <= 0 ? <label style={{color:'red', display:'block'}}>Must select category</label> : ""}
            </div>
            <div className='sub-post-category'>
            <h4>City</h4>
              <select onChange={(e)=> handleChange(e)} name='location'>
                  <option value={getValues.location}>{getValues.location}</option>
                  <option value="Addis Abeba">Addis Abeba</option>
                  <option value="Adama">Adama</option>
                  <option value="Bahir Dar">Bahir Dar</option>
                  <option value="Hawassa">Hawassa</option>
                  <option value="Jimma">Jimma</option>
                  <option value="Mekele">Mekele</option>
                  <option value="Gonder">Gonder</option>
              </select>
              {error && values.location.length <= 0 ? <label style={{color:'red', display:'block'}}>Must select city</label> : ""}
            </div>
          </div>
          <h4>Title</h4>
          <input type="text" name='title' defaultValue={getValues.title} onChange={(e)=> handleChange(e)} maxLength={30} required/>
          {error && values.title.length < 1 ? <label style={{color:'red', display:'block'}}>Must input title</label> : ""}

          <h4>Price</h4>
          <input type="number" name='price' defaultValue={getValues.price} onChange={(e)=> handleChange(e)} required/>
          {error && values.price.length < 1 ? <label style={{color:'red', display:'block'}}>Must input price</label> : ""}

          <h4>Phone</h4>
          <input type="number" name='phone' defaultValue={getValues.phone} onChange={(e)=> handleChange(e)} required/>
          {error && values.phone.length < 1 ? <label style={{color:'red', display:'block'}}>Must input phone</label> : ""}

          <h4>Description</h4>
          <textarea rows="8" cols="100" name='description' defaultValue={getValues.description} onChange={(e)=> handleChange(e)} required></textarea>
          {error && values.description.length < 1 ? <label style={{color:'red', display:'block'}}>Must input title</label> : ""}

          <p style={{fontSize: "13px", color: "#555"}}>It have to be more than 2 images</p>
          <input type="file" accept="image/png , image/jpeg, image/webp" multiple minLength={2} onChange={(e)=> handleFileChange(e)} style={{marginRight:'10px', position:'relative', top:'-2px'}}/>
          {error && values.img.length < 1 ? <label style={{color:'red', display:'block'}}>Must choose image</label> : ""}

          {imageFile.length < 2 || progress === 0 ? <button type='button' onClick={handleSubmit}>Upload image</button>: imageFile.length === img.length ? <button type='button'>Done</button> : <button type='button' style={{position:'relative', top:'13px'}}><LoadingPost/></button>}
          <br/><br/>
          <button type='button' onClick={post} >Update</button>        
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Edit
