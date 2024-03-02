import React,{useState,useEffect} from 'react'
import './styles/newProduct.css';
import Burger from '../assets/Burger.jpg'
import axios from 'axios'
import {Triangle} from 'react-loader-spinner'
import { TiTick } from "react-icons/ti";
const NewProduct = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [prevImg,setprevImg] = useState(null)
    const[isProductAdded,setIsProductAdded] = useState(false)
    const [isProcessing,setIsProcessing] = useState(false)
    const [name,setName] = useState('')
    const [price,setPrice] = useState(Number)
    const token = sessionStorage.getItem('refresh_token')
 const formData = new FormData()
 formData.append('FoodName',name)
 formData.append('Price',parseInt(price))
 formData.append('image',prevImg)
  const handelPostItem =async ()=>{
    if(isProcessing) return;
    setIsProcessing(true)
    try{
        const data = await axios.post(`${baseUrl}/food?token=${token}`,formData,{
            withCredentials:true
        })

      
        if(data.status === 200){
            setIsProcessing(false)
            setIsProductAdded(true)
            setTimeout(()=>{
                setIsProductAdded(false)
            },1500)
        }
    }catch(error){
        console.log(error)
        setIsProcessing(false)
    }
    
  }
  return (
    <div className='newItemAdd'>
        <h1>Add A New Dish </h1>
    <form action="" onSubmit={(e)=>e.preventDefault()}>
   <label htmlFor="item name">
    <span>food name</span>
    <input type="text" id='item name' placeholder=' name'  value={name} onChange={(e)=>setName(e.target.value)}/>
   
    
   

   </label>
   <label htmlFor="price">
        <span>price</span>
        <input type="number" name="" id="price" placeholder=' price' value={price} onChange={(e)=>setPrice(e.target.value)} />

    </label>
    <div className="coverPrev">

 
    <div className="prevImg">
        {
            prevImg &&(
                <img src={URL.createObjectURL(prevImg)} alt="" />
            )
        }
       
    </div>
    </div>
    <label htmlFor="files">
    <input type="file" name="" id="files" onChange={(e)=>setprevImg(e.target.files[0])} />

    </label>
    <button className='PostToServer' onClick={handelPostItem}>{isProcessing?<Triangle
      visible={true}
      height="20"
      width="40"
      color="#fff"
      ariaLabel="triangle-loading"

      />:"Submit"}</button>
    </form>
    <div className="pops" style={isProductAdded?{right:0}:{right:"-100vh"}}>
        <TiTick size={25}/>
         product added
       </div>
     </div>
  )
}

export default NewProduct