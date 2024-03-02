import React,{ useState,useEffect } from 'react';
import {v4 as id} from 'uuid'
import ProductAdd from '../extra/ProductAdd';
import '../styles/Manage.css'
import axios from 'axios'
import { TiTick } from "react-icons/ti";
 import {LineWave} from 'react-loader-spinner'
 import {Link} from 'react-router-dom'
 import "../styles/ResOrder.css"
const ManageResturent =  () => {
  const baseUrl = import.meta.env.VITE_BASE_URL
const[isSaveInfo,setIsSaveInfo] = useState(false)

 const [unauthorze,setUnauthorize] = useState(false)
  

const[inputs,setInputs] = useState([])
const[isOrderClick,SetIsOrderClik] = useState(true)

const [ResData,setResData] = useState([])
const [order,setOrder]= useState([])
const token = sessionStorage.getItem('refresh_token')
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
       const {data} = await axios.get(`${baseUrl}/restaurant?token=${token}`,{
         withCredentials:true
       })
       setResData(data)
       
      }catch(error){
       console.log(error)
      }
   
    }
    fetchData()
     },[])

  const handleInputTextChange = async (e,id)=>{
    
   const newArray = inputs.map((item)=>{
        if(item._id===id){
           const itemsOne = {...item,FoodName:e.target.value}
           return itemsOne

        }
        return item
   })
   setInputs(newArray)

   try{
      const data = await axios.put(`${baseUrl}/food/inputChange?token =${token}`,{
        foodName:e.target.value,
        id:id
      },{
        withCredentials:true
      })
    
   }catch(error){
    console.log(error)
   }
  }
 const handleInputNumberChange =  async(e,id)=>{
  const newArray = inputs.map((item)=>{
    if(item._id===id){
       const itemsOne = {...item,Price:e.target.value}
       return itemsOne

    }
    return item

    
})
setInputs(newArray)

try{
  const data = await axios.put(`${baseUrl}/food/inputPrice?token=${token}`,{
    Price:e.target.value,
    id:id
  },{
    withCredentials:true
  })
 console.log(data)
}catch(error){
console.log(error)
}

 }
 const handleRemoveInput = async(id)=>{
   const newArray = inputs.filter((item)=>item._id!==id)
   setInputs(newArray)

   try{
    const data = await axios.delete(`${baseUrl}/food/delete?id=${id}&token=${token}`,{
      withCredentials:true
    })
    
   }catch(error){
    console.log(error)
   }
 }
 const handelCheckItem =(id)=>{
   const newArrayCheck= ResData.Category.map((item)=>{
     if(item.id ===id){
       return {...item,checked:!item.checked}
       
     }
     return item
   })
   setResData((prev)=>({
    ...prev,Category:newArrayCheck
   }))
 }
 const handelResNameChange =(e)=>{
  const{name,value} = e.target
  
  setResData((prev)=>({
    ...prev,[name]:value
  }))
 }
  const handelSaveInfo = async ()=>{
   try{
     const data = await axios.put(`${baseUrl}/restaurant/saveInfo?token=${token}`,{
      ResArray:ResData
     },{
      withCredentials:true
     })
     if(data.status === 200){
      setIsSaveInfo(true)
      setTimeout(()=>{
       setIsSaveInfo(false)
      },1900)
     }
     
   }catch(error){
    console.log(error)
   }
  }

 useEffect(()=>{
   const fetchItems = async()=>{
    try{
      const {data} = await axios.get(`${baseUrl}/food/reswoner?token=${token}`,{
        withCredentials:true
      })
      setInputs(data)
     /*  console.log(data) */
    }catch(error){
      console.log(error)
    }
     
   }
   fetchItems()
 },[])

 useEffect(()=>{
  const fetchOrder = async ()=>{
      try{
       const {data} = await axios.get(`${baseUrl}/checkOut/adminGet?token=${token}`,{
        withCredentials:true
       })
      /*  console.log(data) */
       setOrder(data)
      }catch(error){
        if(error.response.status ===401){
          setUnauthorize(true)
        }else{
          console.log(error)
        }
   
      }
   
  }
  fetchOrder()
 },[baseUrl])
 const handelStausChnages = async (value,id)=>{
   try{
     const {data} = await axios.post(`${baseUrl}/checkOut/changeStatus?token=${token}`,{
      value,
      id
     },
     {
      withCredentials:true
     })
     console.log(data)
   }catch(error){
    console.log(error)
   }
 }
 if(!ResData.Category) return <div><LineWave
 visible={true}
 height="100"
 width="100"
 color="#4fa94d"
 ariaLabel="line-wave-loading"
 wrapperStyle={{}}
 wrapperClass=""
 firstLineColor=""
 middleLineColor=""
 lastLineColor=""
 /></div>
  return ( 
    <div className="mngResturents">
       

   
          <div className="clickablesButtons">
           <button onClick={()=>SetIsOrderClik(true)} className={isOrderClick?"activeButton ":null}>Order</button>
           <button onClick={()=>SetIsOrderClik(false)} className={!isOrderClick?"activeButton ":null}>Manage Restaurant</button>
          </div>
          
             {
              isOrderClick ?(
                
                <div className="ResOrder">
                  {
                    unauthorze?(
                      <div style={{
                        color:"#222",
                        fontSize:"3vw"
                      }}>You are not authorized to see orders.</div>
                    ):(
                      <div className="ResSigOrders">
                      {
                        order.map((item)=>(
                           <div className="itemsss" key={item._id}>
                            <div className="indeerDiv">
                              <div className='fffffff'>
                              <p>customer:{item.customerId}</p>
                            <p>total: <span>{item.totalAmount}$</span> </p>
                              </div>
                           
                             <div className="listedItemns">
                             <p>orderList:</p>
                              {
                                item?.foodItem?.map((item,index)=>(
                                  <li key={index}>{item}</li>
                                ))
                              }
                             </div>
                       
                            </div>
                            <select name="" id="" defaultValue={item.status}
                            
                            onChange={(e)=>handelStausChnages(e.target.value,item._id)}
                            >
                              <option value="paid">paid</option>
                              
                              <option value="on the way">on the way</option>
                              <option value="delivered">delivered</option>
                            </select>
                          
                           </div>
  
                        ))
                      }
                    </div>
                    )
                  }
                
    
              </div>
              ):(
                <div className="mngWrapper">
                <div className="mngHeading">
                 <h2>Manage your restaurant in one place</h2>
            
                 <p>Enter details of your restaurant in one place</p>
                </div>
                <form action="" onSubmit={(e)=>e.preventDefault()}>
                 <div className="resNames">
                  <p>Name</p>
                 <input type="text" name="RestaurantName" id="" value={ResData.RestaurantName} onChange={(e)=>handelResNameChange(e)} />
                 </div>
                 <div className="locationOfRes">
                    <div className="citys">
                     <p>City</p>
                     <input type="text" name="City" id="" value={ResData.City} onChange={(e)=>handelResNameChange(e)} />
                    </div>
                    <div className="countres">
                     <p>Country</p>
                     <input type="text" name="Country" id=""  value={ResData.Country} onChange={(e)=>handelResNameChange(e)} />
                    </div>
                 </div>
                 <div className="delivery">
                   <p>delivery price($)</p>
                   <input type="text" name="DeliveryPrice" id="" value={ResData.DeliveryPrice}  onChange={(e)=>handelResNameChange(e)} />
         
                 </div>
                 <div className="deliveryTime">
                 <p>delivery Time(max)</p>
                   <input type="text" name="DeliveryTime" id=""  value={ResData.DeliveryTime}  onChange={(e)=>handelResNameChange(e)}/>
                 </div>
         
         
         
                </form>
                <hr />
                <div className="typeOfFood">
             
                   <h2>Select what type of food you serve</h2>
             
                 <div className="inputsCheck">
         
                {
                ResData.Category.map(item=>(
         
                   <label htmlFor={item.value} key={item.id}>
                   <input type="checkbox"  id={item.value} value={item.value} checked={item.checked} 
                   onChange={()=>handelCheckItem(item.id)}
                   
                   />
                    {item.value}
                 </label>
         
                 )
         
                 )
                }
                
          
                <div className="popUp" style={isSaveInfo?{right:0}:{right:"-100vh"}}>
                 <TiTick size={25}/>
                  Update successfully
                </div>
         
                 </div>
                 <button className='ResSub' onClick={handelSaveInfo}>Submit</button>
                </div>
               <ProductAdd inputs={inputs}  handleInputTextChange={handleInputTextChange} handleInputNumberChange={handleInputNumberChange}
                handleRemoveInput={handleRemoveInput}
               />
         
               <div className="AddNewProduct" style={{
                 marginTop:"30px"
               }}>
                 <Link to={'/newItem'}>
                 <button className='ResSub' style={{
                   width:'100px',
                   height:"30px"
                 }}>Add new Item</button>
                 </Link>
                 
               </div>
              </div>
              )
             }
         

  

    </div>
  );
};

export default ManageResturent;
