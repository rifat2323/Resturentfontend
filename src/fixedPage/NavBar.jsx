import React,{useState,useEffect,useContext} from 'react'
import '../styles/navbar.css'
import {Link} from 'react-router-dom'
import { TbMenuDeep } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { PiSmileyBlankBold } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { DataProvider } from '../context/Context';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";

const NavBar = () => {
  const BaseURl = import.meta.env.VITE_BASE_URL
  const[isCloseClick,setIsCloseClick] = useState(false)
  const[screenSize,setScreenSize] = useState(window.innerWidth)
  const {userMail} = useContext(DataProvider)
 const Navigate = useNavigate()
  useEffect(()=>{
    const handelSize = ()=>setScreenSize(window.innerWidth)
     window.addEventListener("resize",handelSize)
     return()=>{
      window.removeEventListener("resize",handelSize)
     }

  },[])
  useEffect(()=>{
    if(screenSize>768){
      setIsCloseClick(false)
    }
    if(screenSize<768){
      setIsCloseClick(true)
    }
  },[screenSize])
  const handelLogOut = async ()=>{
     try{
      const {data} = await axios.get(`${BaseURl}/user/logout`,{
        withCredentials:true
      })
       if(data.logOut ===321){
        location.reload();
        location.replace('/')
        sessionStorage.clear()

       }
     }catch(error){
      console.log(error)
     }
     
  }
  return (
    <div className="navbar">
     <nav>
      <div className="logo">
        <Link to={'/'} >
        <h3>foodies</h3>
        </Link>
     
      </div>
    

     <div className="loginNav" style={isCloseClick?{right:"-100vh"}:null}>
      <div className="hideTitle">
        <div style={{display:"flex",justifyContent:"space-between",
      alignItems:"center"}}>
        <h1  style={{
          color:"#FE7A36"
        }}>{userMail? userMail:"welcome to foodies"}</h1>
        <IoCloseOutline size={20} style={{
          cursor:"pointer",
          color:"#333"
        }} onClick={()=>setIsCloseClick(true)}/>
        </div>
       
        <hr />
      </div>
       <div className="user">
        {
          userMail?(
            <div className="userInfo">
            
              <h5 onClick={()=>Navigate("/activeOrder")}>order status</h5>
             
         
             <div className="userEmail">
             <h6><PiSmileyBlankBold size={25} style={{
              color:"rgba(255, 94, 0, 0.822)"
             }}/>{userMail}</h6>
                <div className="popHover">
                <Link to={'/manageRestaurant'} >
                <h5>Manage restaurant</h5>
                </Link>
                  
                  <Link to={'/userProfile'} style={{width:"100%"}}>
                  <h5>User profile</h5>
                  </Link>
                 
                  <button onClick={handelLogOut}><IoIosLogOut size={25}/>Logout</button>
                </div>
            
             </div>
             <h3 onClick={()=>Navigate('/cart')} className='navbarTOcart'>
             <CiShoppingCart size={25} style={{
              width:"50px",
              aspectRatio:"1"
             }}/>
             </h3>
          
           </div>
          ): (
            <Link to={'/login'}>
            <h3 >log In</h3>
            </Link>
          )
        }
     
     
      
     
       </div>
      
     </div>
     <div className="menu">
     <TbMenuDeep size={25} style={{
      color:"rgb(255, 94, 0)",
      cursor:"pointer"
     }} onClick={()=>setIsCloseClick(false)}/>
     </div>
    
     </nav>

 
    </div>
  )
}

export default NavBar
