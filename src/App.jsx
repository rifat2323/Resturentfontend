import { useState,lazy,Suspense,useContext } from 'react'

import './App.css'
import {BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'

import Home from './pages/Home'
import NavBar from './fixedPage/NavBar'
import Footer from './fixedPage/Footer'
const Login = lazy(()=>import('./elements/Login'));
const UserPage = lazy(()=>import('./elements/UserPage'));
const ManageResturent = lazy (()=>import ( './pages/ManageResturent'))  
const NewProduct = lazy(()=>import('./extra/NewProduct'))
import {Triangle} from 'react-loader-spinner'
import SearchPage from './pages/SearchPage'
import Cart from './pages/Cart'
import PaymentForm from './important/Payment'
import {Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js/pure';
import { DataProvider } from './context/Context'
import Order from './pages/order'
const Signup = lazy(()=>import('./pages/Signup'))
function App() {
  const {total} = useContext(DataProvider)
  const [count, setCount] = useState(0)
  const promises = loadStripe('pk_test_51OooNgIfpG0m17PKJV3g9lCbfGe882NLrDrBfpZI7JCeW5Es8t5VL9JrrsFcNlldg4IcPEjOOMixvFqHZMIk48Qe003jlYi7ZO')
  return (
    <>
    <BrowserRouter>
    <Routes>
  <Route path='/' element={
    <>
    <NavBar/>
    <Home/>
    <Footer/>
    </>
  } />
    
  <Route path='/userProfile' element={
<>
<Suspense fallback="loading">
<NavBar/>
<UserPage/>
<Footer/>
</Suspense>
 
</>

  }/>


  <Route path='/manageRestaurant' element={
    <>
  <Suspense fallback="loading">
<NavBar/>
<ManageResturent/>
<Footer/>
</Suspense>
    
    
    </>



  }/>
  <Route path='/signup' element={
    <Suspense fallback="loading...">
       <Signup/>
    </Suspense>
  
  } />
  <Route path='/activeOrder' element={
    <>
 
<NavBar/>
<Order/>
<Footer/>

    
    
    </>



  }/>

  <Route path='/newItem' element={
    <Suspense fallback={<Triangle
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />}>
        <NavBar/>
      <NewProduct/>
      <Footer/>
    </Suspense>
  }/>

  <Route path='/search/:item' element={
     <>
     <NavBar/>
     <SearchPage/>
     <Footer/>
     </>
  } />
  <Route path='/cart' element={
     <>
     <NavBar/>
     <Cart/>
     <Footer/>
     </>
  } />
  <Route path='/checkOut' element={
   <Elements stripe={promises} >
     <PaymentForm/>
   </Elements>
 
  
  }/>
    <Route path='/login' element={<Suspense fallback="loading"><Login/></Suspense>}/>
 <Route path='*' element={<Navigate  to='/' />}/>


    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
