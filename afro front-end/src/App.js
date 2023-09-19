import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Post from './pages/Post';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Search from './pages/SearchPage';
import Category from './pages/Category';
import Favorites from './pages/Favorites';
import Uploads from './pages/Uploads';
import Edit from './pages/Edit';


// import moduleName from './img/12018(1).jpg'

function App() {
  return (
      <div className="App">

          <Router>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/post' element={<Post />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/contact' element={<Contact />}/>
              <Route path='/product/:id' element={<Product />}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/category' element={<Category/>}/>
              <Route path='/favorites' element={<Favorites/>}/>
              <Route path='/uploads' element={<Uploads/>}/>
              <Route path='/edit/:id' element={<Edit/>}/>
            </Routes>
          </Router>
      </div>
   
  );
}

export default App;
