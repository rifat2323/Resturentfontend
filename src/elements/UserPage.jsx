import React,{useState,useEffect} from 'react'
import '../styles/profile.css'
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner'
import { TiTick } from "react-icons/ti";

const UserPage = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [toster, setToser] = useState(false)
     useEffect(()=>{
        const getUser = async ()=>{
         
            try{
                const {data} = await axios.get(`${baseUrl}/user/singleUser`,{
                    withCredentials:true
                })
                setEmail(data.email)
                setUsername(data.username || '')
                setCity(data.city || '')
                setCountry(data.country || '')
                setAddress(data.address || '')
               /*  console.log(data) */
            
              }catch(error){
               console.log(error)
             
              }
        }
        getUser()
     },[])
     const newUpdateUser ={
        username:username,
        city:city,
        country:country,
        address:address
     }
     const handelUpdateUser = async ()=>{
        if(isLoading) return;

        setIsLoading(true)
       
        setToser(false)
        try{
            const data = await axios.put(`${baseUrl}/user/updateUser`,newUpdateUser,{
                withCredentials:true
            })
            console.log(data)
           if(data.status === 200){
            setIsLoading(false)
            setToser(true)
           }
           setTimeout(()=>{
            setToser(false)
           },1500)
        }catch(error){
            console.log(error)
        }
       
     }
  return (
     <div className="profileWrapper">

   
    <div className='userProfile'>
       <div className="userProfileHeadingInfo">
        <h2>User Profile</h2>
        <p>views and changes profile information here</p>
       </div>
        <div className="profileInformation">
           <form action="" onSubmit={(e)=>e.preventDefault()}>
          <div className="emailChangeDiv">
           <p>Email</p>
           <input type='text' disabled="disables" value={email}/>
          </div>
           <div className="nameChangeDiv">
           <p>Name</p>
           <input type="text"  autoComplete='true' aria-label='1' value={username} onChange={(e)=>setUsername(e.target.value)}/>
           </div>
          <div className="extraInformationChange">
            <div className="city">
                <p>address</p>
                <input type="text"   autoCapitalize='true' value={address} onChange={(e)=>setAddress(e.target.value)} /> 
            </div>
            <div className="city">
                <p>city</p>
                <input type="text"   autoCapitalize='true' value={city} onChange={(e)=>setCity(e.target.value)}/> 
            </div>
            <div className="city">
                <p>country</p>
                <input type="text"   autoCapitalize='true' value={country} onChange={(e)=>setCountry(e.target.value)}/> 
            </div>
          </div>

         
           </form>
           
           <button  onClick={handelUpdateUser}> {isLoading?<ThreeDots
      visible={true}
         height="50"
        width="50"
            color="#fff"
           radius="9"

  
  />:("submit")}</button>
        </div>
    
        
    </div>
    <div className="updatesUserTost" style={toster?{right:"20px"}:{right:"-100vh"}}>
        <p><TiTick size={25} style={{
             color:"#08e013"
        }}/><span>user updated successfully</span></p>
    </div>
    </div>
  )
}

export default UserPage