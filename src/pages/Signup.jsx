import React, { useState } from 'react';
import '../styles/signup.css'; 
import { Link,useNavigate  } from 'react-router-dom';
import axios from 'axios'

const SignUpForm = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [already,setAlready] = useState(false)
  const [invalidFormate,setInvlidFormate] = useState(false)
  const Navigate = useNavigate ()

  const handleSignUp = async () => {
       try{
        const {data} = await axios.post(`${baseUrl}/user/newUser`,{
            email,password,username
        },{
            withCredentials:true
        })
        console.log(data)
        if(data){
            Navigate('/login')
        }
   /*  console.log("Signing up with:", { username, email, password }); */
       }catch(error){
        if(error.respond.status ===409){
            setAlready(true)
        }else if(error.respond.status ===406){
            setInvlidFormate(true)
        }

        console.log(error)
       }
  };

  return (
    <div className="signupWrapper">
    <div className="signup-container">
      <h2>Sign Up</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      <div className="signin-link">
        Already have an account? <Link to={'/login'}>Sign in</Link>
      </div>
    </div>

       {
       already ?(
        <div className='already-account'>
        You have already an account please <Link to={'/login'} style={{
            color:"blue",
            textDecoration:"underline"
        }}>Login</Link>
    </div>
       ):invalidFormate?(
        <div className='already-account'>
       invalid email formate
    </div>
       ):null


       }
          

    </div>
  );
};

export default SignUpForm;
