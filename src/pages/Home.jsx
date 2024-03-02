import React,{useContext} from 'react'
import Burger from '../assets/Burger.jpg'
import '../styles/home.css'
import { CiSearch } from "react-icons/ci";
import Bottom from '../assets/heroDownload.png'
import Store from '../assets/store.png'
import { DataProvider } from '../context/Context';
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const {searchTerm,setSearchTerm} = useContext(DataProvider)
 const Navigate = useNavigate()
  const handelPageLoad = ()=>{
     Navigate(`/search/${searchTerm}`)
  }
  return (
    <>
     <div className="home">
      <div className="heroImg">
        <img src={Burger} alt="" />
      </div>
       <div className="imgCoverCard">
         <h2>Tuck into a takeway today</h2>
         <p>Food is just click away!</p>
         <div className="searchOption">
          <CiSearch size={25} style={{
            color:'rgb(255, 115, 0)'
            
          }}/>
          <input type="text" placeholder='search food here...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
           <div className="buttons">
            <button onClick={()=>setSearchTerm('')} >Reset</button>
            <button onClick={handelPageLoad}>Search</button>
           </div>
         </div>
       </div>
    
     </div>
     <div className="belowHero">
     <div className="leftHero">
      <img src={Bottom} alt="" />
    </div>

    <div className="rightHero">
         <h4>order take way even faster</h4>
         <p>Download food app for fast ordering</p>
         <img src={Store} alt="" />
     </div>

     </div>
     </>
     
  )
}

export default Home