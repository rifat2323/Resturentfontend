import React,{useState,useEffect,useContext} from 'react'
import { DataProvider } from '../context/Context'
const Category = () => {
 const {activeCategory,setActiveCategory}= useContext(DataProvider)
  
  const searchCategory = [
    {
     value:"American",
     id:1,
   
   },
   {
     value:"BBQ",
     id:2,
   
   },
   {
     value:"Burger",
     id:3,
   
   },
   {
     value:"Cafe",
     id:4,
   
   },
   {
     value:"Pizza",
     id:5,
   
   },
   {
     value:"Healthy",
     id:6,
   
   },
   {
     value:"Organic",
     id:7,
   
   },
   {
     value:"Tacos",
     id:8,
   
   }
]

const handelCetgoreyClcik =(value)=>{
  setActiveCategory(value)

}
  return (
    <>
      <div className="headerCategory" style={{
        display:"flex",
        width:"100%",
        alignItems:"center"
      }}>
        <p style={{
          marginRight:"5px",
          fontSize:".9em",
          color:"#e25909d5",
          fontWeight:"bold"
        }}>search by category</p>
        <p style={{fontSize:".8em",
                  cursor:"pointer",
                  color:"blue",
                  textDecoration:"underline"
                }} onClick={()=>setActiveCategory('')}>reset</p>
      </div>
    <div className='categoryClickItem'>

      
          {
            searchCategory.map(item=>(
       
             <button key={item.id} onClick={()=>handelCetgoreyClcik(item.value)}
            
             className={item.value === activeCategory ? "active" : ""}
             >{item.value}</button>
       
            ))
       
            }
      
    </div>
    </>
  )
}

export default Category