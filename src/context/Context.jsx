import React,{useEffect,useState,createContext} from 'react'
import axios from 'axios'
export const DataProvider = createContext()
const Context = ({children}) => {
let userMail = sessionStorage.getItem('userMail')
const baseUrl = import.meta.env.VITE_BASE_URL;
 const [auth, setAuth] = useState(false);
 
 const [activeCategory,setActiveCategory] = useState(String);
 const [searchTerm,setSearchTerm] = useState('');
 const [sortBy,setShortBy] = useState(Number);
 const [foodItems,setFfoodItems] = useState([]);
 const [total,setTotal] = useState([])
 const [cartItemsNames,setCartsItemsNames] = useState([])

 useEffect(()=>{
  const fetchData = async ()=>{
   try{
     const {data} = await axios.get(`${baseUrl}/food/getItems?Fname=${searchTerm}&category=${activeCategory}&filterBy=${sortBy}`)
     
     setFfoodItems(data)
   }catch(error){
      console.log(error)
   }


  }
  fetchData()
 },[activeCategory,searchTerm,sortBy])


  const accessToken = document.cookie;
     const access = accessToken.indexOf("access_token")

  return (
    
   <DataProvider.Provider value={{userMail,setAuth,auth,activeCategory,setActiveCategory,
      searchTerm,setSearchTerm,foodItems,setShortBy,access,setTotal,total,setCartsItemsNames,cartItemsNames
   }}>
      {children}
   </DataProvider.Provider>

  )
}

export default Context