import React,{useState} from 'react'
import Admin from './pages/Admin';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes ,Route } from 'react-router-dom';
import Register from './components/Register';
import ViewOrder from './pages/ViewOrder';
import Home from './pages/Home';
import CustomerViewPro from './pages/CustomerViewPro';
function App() {

  
  const [productname, setProductName] = useState()
    const [productprice, setProductPrice] = useState()
    const [productimage, setProductImage] = useState()
  const order = (productimage,productname,productprice) =>{
    
    setProductName(productname)
    setProductPrice(productprice)
    setProductImage(productimage)
  }

  // const user = localStorage.getItem('user');
  
  return (
    <>
        <Routes>            
            
            <Route exact path='/register' element={<Register/>}></Route>
            <Route exact path='/home' element={<Home order={order}/>}></Route>
            <Route exact path='/customer-order' element={<CustomerViewPro productname={productname} productprice={productprice} productimage={productimage} />}></Route>
            <Route exact path='/' element={<Login/>}></Route>
              <Route exact path='/register' element={<Register/>}></Route>
              <Route exact path='/admin' element={<Admin />}></Route>
            <Route exact path='/view-order' element={<ViewOrder/>}></Route>
          </Routes>
      
        {/* {
          (!localStorage.getItem('user') )? 
            
            <>
            <Routes>
              <Route exact path='/' element={<Login/>}></Route>
              <Route exact path='/register' element={<Register/>}></Route>
            </Routes>
            </>
          :

            (localStorage.getItem('user') === 'admin')?

          <Routes>            
            <Route exact path='/admin' element={<Admin />}></Route>
            <Route exact path='/view-order' element={<ViewOrder/>}></Route>
            
          </Routes>
            :

            <Routes>            
            
            <Route exact path='/register' element={<Register/>}></Route>
            <Route exact path='/home' element={<Home order={order}/>}></Route>
            <Route exact path='/customer-order' element={<CustomerViewPro productname={productname} productprice={productprice} productimage={productimage} />}></Route>
          </Routes>
        } */}
    
    </>
  )
}

export default App
