import React,{useContext,useRef} from 'react'
import '../styles/search.css'
import Category from '../cardsPages/Category';
import SearchItems from '../cardsPages/SearchItems';
 import { DataProvider } from '../context/Context';

const SearchPage = () => {
  const Ref = useRef()
  const {searchTerm,setSearchTerm} = useContext(DataProvider)
  return (
    <div className='searchPageWrapper'>
         <div className="searchHeaderPage">
            <input type="text" name="" id="" placeholder='search here' ref={Ref} />
            <button onClick={()=>setSearchTerm(Ref.current.value)}>Search</button>
         </div>
          <div className="smallWrapperSearch">
           <div className="CategoryItemSearch">
            <Category/>
            
           </div>
            <div className="SearchItems">
              <SearchItems/>
            </div>


          </div>



    </div>
  )
}

export default SearchPage