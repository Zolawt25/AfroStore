import React from 'react'
import Navbar from '../components/Navbar'
import Navbarsub from '../components/Navbarsub'
import Sidebar from '../components/Sidebar'
import HomeProducts from '../components/HomeProducts'
import Footer from '../components/Footer'
import Search from "../components/Search"

const Home = () => {
  return (
    <div>
       <Navbar />
      <Navbarsub />
      <Search />
      {/* <img src={moduleName} alt="" /> */}
      <Sidebar/>
      <HomeProducts/>
      <Footer />
    </div>
  )
}

export default Home
