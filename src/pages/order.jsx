import React,{useEffect,useState} from 'react'
import '../styles/casOrder.css';
import axios from 'axios'
const Order = () => {
  const [orderDetalis,setOrderDetalis] = useState([]);
   const [detalis,setDetalis] = useState({})
   const  [noOrder,setNoOrder] = useState(false);
   console.log(orderDetalis)
  const baseUrl = import.meta.env.VITE_BASE_URL
  const token = sessionStorage.getItem('refresh_token')
  useEffect(()=>{
    const fetchItem = async ()=>{
      try{
        const {data} = await axios.get(`${baseUrl}/checkOut/userCheckout?token=${token}`,{
          withCredentials:true
         })
  /*    console.log(data)  */
       setOrderDetalis(data.FindOder)
       setDetalis(data.adresess)
      }catch(error){
        if(error.response.status ===404){
          setNoOrder(true)
        }
        console.log(error)
      }
     
    }
    fetchItem()

  },[])
  if(noOrder){


    return (

      <div style={{
        width:"100",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        color:"#3C3633"
      }}>You don not have any order at this moment</div>
    )
  }
  return (


    <div className='customerOrder'>
      <div className="statusOfOder">
      <h1>Your order Status: {orderDetalis.status}</h1>
       <div className="prograssBar">
          <div className="insidePrograssBar" style={{
             width:orderDetalis.status === "paid" ?"30%":orderDetalis.status === "on the way" ?"60%":orderDetalis.status === "delivered" ?"100%":"20%"
          }}></div>
       </div>
      </div>

      <div className="belowOrderDetalis">

      <div className="orderList">
      <h3>Your order list:</h3>
        {
          orderDetalis?.foodItem?.map((item,index)=>(
       
           <li key={index}>{index}. {item}</li>
           
           
          ))
        }
         <h6>Your total is:{orderDetalis.totalAmount}$</h6>
        </div>
       

     
     

      <div className="location">
        <h3>Delivery location:</h3>
        <li>city:{detalis.city}</li>
        <li>Home:{detalis.address}</li>
      </div>
      </div>
     


    </div>
  )
}

export default Order