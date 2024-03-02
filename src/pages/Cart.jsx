import React,{useEffect,useState,useContext} from 'react'
import axios from "axios"
import { DataProvider } from '../context/Context'
import '../styles/cart.css'
import { RiDeleteBin7Line } from "react-icons/ri";
import {useNavigate,Link} from 'react-router-dom'
const Cart = () => {
    const {access,setTotal,setCartsItemsNames,cartItemsNames} = useContext(DataProvider)
    const baseUrl = import.meta.env.VITE_BASE_URL
     const [cartData,setCartData] = useState([])
     const [noItems,setNoitems] = useState(false)
     const navigate = useNavigate()
     const token = sessionStorage.getItem('refresh_token')
    useEffect(()=>{

        if(access !==-1){
            const fetchData = async ()=>{
                try{
                  const {data} = await axios.get(`${baseUrl}/cart?token=${token}`,{
                    withCredentials:true
                  })
                  setCartData(data)
              /*    console.log(data) */
                }catch(error){
                  if(error.response.status ===403){
                    setNoitems(true)
                  }else{
                    console.error(error)
                  }
                 
                }
              }
              fetchData()
        }
      
    },[])
  

    const handelRemoveItem =async (id)=>{
     const newArray = cartData.cartFood.filter((item)=>item._id!==id)
       const total = newArray.reduce((index,value)=> index+value.foodId.Price,0)
      setCartData((prev)=>({
        ...prev,cartFood:newArray,total:total
      }))
     try{
       const {data} = await axios.delete(`${baseUrl}/cart/${id}?token=${token}`,{
        withCredentials:true
       })
       console.log(data)

     }catch(error){
        console.log(error)
     }
    }
    const handelFoodName =()=>{
      const names = cartData?.cartFood?.map((item)=> item.foodId.FoodName
      
      )
      setCartsItemsNames(names)
    }
  const handelPaymetPage =(total)=>{
    setTotal(total)
    navigate("/checkOut")
  }
    if(!cartData){
        return <div>please login or add some food item</div>
    }
    if(noItems) return <div className='cartwrapper'> <h1>you have 0 item, explore more </h1></div>
    if(!cartData.cartFood) return <div>loading...</div>
  return (
    <div className='cartwrapper'>
        <h1>you have {cartData && cartData.cartFood?cartData.cartFood.length:"0"} item</h1>
      <div className="cartItem">
       {

        cartData?.cartFood?.map((item,index)=>(
          <div key={item._id} className='cartSingaleItem'>
            <div className="imgs">
            <p>{index}.</p>
                <img src={item.foodId.Image} alt=""  width={50} height={50}/>
            </div>
            <div className="detalis">
            <p>{item.foodId.FoodName}</p>
            <p>price:{item.foodId.Price}$</p>
            </div>
              
              <div className="deleteItems">
                <RiDeleteBin7Line size={25} onClick={()=>handelRemoveItem(item._id)}/>
              </div>

          </div>


        ))
       }

      </div>
      {
        cartData.cartFood.length > 0 &&(
         <>
          <hr />
          <div className="total">
              <p>Total:</p>
              <p>={cartData.total}$</p>
              <button onClick={()=>{handelPaymetPage(cartData.total) ;
                handelFoodName();
                
                }}>Check out</button>
          </div>
          </>
        )
      }
      
    </div>
  )
}

export default Cart