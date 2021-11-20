import React,{useState} from 'react'
import Admin from './pages/Admin';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes ,Route, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import ViewOrder from './pages/ViewOrder';
import Home from './pages/Home';
import CustomerViewPro from './pages/CustomerViewPro';
function App() {

  const navigate = useNavigate();
  const [productname, setProductName] = useState()
    const [productprice, setProductPrice] = useState()
    const [productimage, setProductImage] = useState()
  const order = (productimage,productname,productprice) =>{
    
    setProductName(productname)
    setProductPrice(productprice)
    setProductImage(productimage)
  }

  const user = localStorage.getItem('user');
  
  return (
    <>

      
        {
          !user ? (
            
            <>
            <Routes>
              <Route exact path='/' element={<Login/>}></Route>
              <Route exact path='/register' element={<Register/>}></Route>
            </Routes>
            </>
          ):

            user === 'admin'?(

          <Routes>            
            <Route exact path='/admin' element={<Admin />}></Route>
            <Route exact path='/view-order' element={<ViewOrder/>}></Route>
            
          </Routes>
            ):

            <Routes>            
            
            <Route exact path='/register' element={<Register/>}></Route>
            <Route exact path='/home' element={<Home order={order}/>}></Route>
            <Route exact path='/customer-order' element={<CustomerViewPro productname={productname} productprice={productprice} productimage={productimage} />}></Route>
          </Routes>
        }
    
    </>
  )
}

export default App
