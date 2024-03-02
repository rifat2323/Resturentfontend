import React,{useContext, useEffect, useState} from 'react'
import Burger from '../assets/Burger.jpg'
import { MdOutlineWatchLater } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { DataProvider } from '../context/Context';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const SearchItems = () => {
  const [exists,setExists] = useState(false)
  const baseUrl = import.meta.env.VITE_BASE_URL
  const {foodItems,setShortBy} = useContext(DataProvider)
  const Navigate = useNavigate()
  const token = sessionStorage.getItem('refresh_token')
  const handelAddedTocart = async(id)=>{

    try{
      const {data} = await axios.post(`${baseUrl}/cart/addItem?token=${token}`,{
        id:id
       },{
        withCredentials:true
       })
       console.log(data)

    }catch(error){
      if(error.response.status ===403){
        Navigate('/login')
      }
      if(error.response.status ===409){
        setExists(true)
        setTimeout(()=>{
          setExists(false)
        },1500)
       
      }else{
        console.log(error)
      }
      
    
    }
  }
   
  return (
    <div className='cardSearchItem'>
    <div className="cardItemSelect">
      <h4> Total {foodItems.length} food items found</h4>
      <select name="" id="mySelect" onChange={(e)=>setShortBy(Number(e.target.value))}>
     <option value="0">Best match</option>
     <option value="101">Best price</option>
     <option value="102">Lowest time</option>

      </select>
    </div>
    <div className="foodItemsCard">
     {
       foodItems.map((item)=>(
        <div key={item._id} className='foodItem'>
         <img src={item.Image} alt=""  />
         <div className="foodInfoItem">
          <div>
          <h5>{item.FoodName}</h5>
           <h6>{item.RestaurantId.RestaurantName}</h6>
          </div>
          <div>
          <p><MdOutlineWatchLater/> :{item.RestaurantId.DeliveryTime} min </p>
        
           <p><LiaShippingFastSolid/>:{item.RestaurantId.DeliveryPrice}$</p>
          </div>
          
         </div>
         <div className="lastPartFoodItemBelow">
         <p>Price:{item.Price}$</p>
         <button onClick={()=>handelAddedTocart(item._id)}>Add to cart</button>
            
            
         </div>
          
        </div>
       ))
     }


    </div>
    
        <div style={{
          position:"absolute",
          top:"50%",
          right:exists?"0":"-100vh",
          background:"#F6F6F6",
          height:"40px",
          color:"#252525",
          textAlign:"center",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          transition:"200ms",
          boxShadow:"5px 5px 7px #333333"
          

        }}  >
          already exists in cart
        </div>
       
    
     

    </div>
  )
}

export default SearchItems