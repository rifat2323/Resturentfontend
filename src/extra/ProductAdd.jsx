import React from 'react';
import './styles/ResProduct.css'
 
const ProductAdd = ({handleInputTextChange,handleInputNumberChange,handleRemoveInput,inputs}) => {
  return (
    <div className='productaddfunctions'>
    {inputs.map((input) => (
      <div key={input._id} className='ResWrapperPro'>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={input.FoodName}
          onChange={(event) => handleInputTextChange( event,input._id)}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={input.Price}
          onChange={(event) => handleInputNumberChange( event,input._id)}
        />
        <button onClick={() => handleRemoveInput(input._id)}>Remove</button>
      </div>
    ))}
    
  
  </div>
  )
}

export default ProductAdd