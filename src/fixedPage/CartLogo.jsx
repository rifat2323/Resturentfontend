import React from 'react'
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import {Link} from 'react-router-dom'
const CartLogo = () => {
  return (
    <div style={{
       position:"fixed",
       right:"0",
       bottom:"50%",
       background:"none",
       width:"50px",
       height:"40px",
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
       zIndex:"2"
    }} className='cartICons'>
        
      
        <div className="wrapCart" style={{
       filter:"drop-shadow(0px 10px 15px -3px rgba(0,0,0,0.4))"
    }}>
      <Link to={'/cart'}>
      <MdOutlineShoppingCartCheckout size={35} color='#333' style={{
    
   }}/>
      </Link>
    
    </div>
 
    

        
        </div>
  )
}

export default CartLogo