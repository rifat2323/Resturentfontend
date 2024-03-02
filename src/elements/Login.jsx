import React,{useState,useEffect} from 'react'
import '../styles/login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const homePage = import.meta.env.VITE_HOME_PAGE
  const baseUrl = import.meta.env.VITE_BASE_URL
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[isRemember,setIsRemember] = useState(false)
    const Navigate = useNavigate()
    useEffect(()=>{
       const user =JSON.parse(localStorage.getItem('userInfo'))
       if(user){
        setEmail(user.email)
        setPassword(user.password)
       }
       
    },[])
  
   const user ={
    email:email,
    password:password
  }
   
   const handelLogin = async () => {
  if (isRemember) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  try {
    const response = await fetch(`${baseUrl}/user/signIn`, {
      method: 'POST',
      body: JSON.stringify(user),
      credentials: 'include' // Equivalent to `withCredentials: true`
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    sessionStorage.setItem('userMail', data.userMail);

    if (data.userMail && data.accessToken) {
      location.replace(homePage);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div className='login'>
       <div className="seperateLogin">
        <div className="leftLogin">
         <div className="header">
            <h2>Sign In</h2>

         </div>
         <div className="inputs">
            <div className="email">
            <label htmlFor="email">Email</label>
            <input type="text" id='email' placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="password">
            <label htmlFor='password'>Password</label>
            <input type="text" id='password' placeholder='enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
           
         </div>
          <button onClick={handelLogin}>Sign In</button>
          <div className="bottomPop">
            <div> 
         
            <input type="checkbox" value={"Remember Me"} id='rem' checked={isRemember} style={{
                border:"1px solid #222",
                accentColor:"firebrick",
                marginRight:"5px"
             
                
            }} onChange={()=>setIsRemember((prev)=>!prev)}/>
            <label htmlFor="rem">Remember me</label>

            </div>
            
            <p style={{
                cursor:"pointer",
                color:"firebrick"
            }}>forgot password</p>
          </div>
          <div className="extra">
          <p>Don't have account</p>
             <button onClick={()=>Navigate('/signup')}>Sign up</button>
          </div>
        </div>
        <div className="rightLogin">
             <h2>welcome to login</h2>
             <p>Don't have account</p>
             <button onClick={()=>Navigate('/signup')}>Sign up</button>
        </div>
        </div> 
        
       
        
        
        
    </div>
  )
}

export default Login
