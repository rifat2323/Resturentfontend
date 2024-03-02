import React, { useState,useContext } from 'react';
import { CardElement, useStripe, useElements,  } from '@stripe/react-stripe-js';
import { DataProvider } from '../context/Context';
import axios from 'axios'
import { TiTickOutline } from "react-icons/ti";
import './ss.css'
import {useNavigate} from 'react-router-dom'
const PaymentForm = () => {
    const {total,cartItemsNames} = useContext(DataProvider)
    const baseUrl = import.meta.env.VITE_BASE_URL
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [complete,setComplet] = useState(false)
 const Navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      const cardElement = elements.getElement(CardElement);

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
         
      });
      console.log(paymentMethod)
    

      if (error) throw new Error(error.message);

      const response = await axios.post(`${baseUrl}/checkOut/payment`,{
        paymentMethod:paymentMethod.id,
        items:cartItemsNames
      },{
        withCredentials:true
      })

      if (response.status!==200) throw new Error('Payment failed');

      const data= response.data
      if(response.status ===200){
        setComplet(true)
        setTimeout(()=>{
            setComplet(false)
            Navigate('/activeOrder')
        },1500)
      }
      console.log('Payment successful:', data);
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentError('Payment failed');
      setTimeout(()=>{
        setPaymentError(null);
    
      },1500)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='checkoutH1'>easy Payment here</h1>
    <form onSubmit={handleSubmit} className='checkoutform'>
      <div className='leftCheckoutInfo'>
     
        <span>product Price:{total}$ </span>
        <span>charge:2$</span>
        <hr  />
        <span>subtotal:{total+2}</span>

      </div>
       <div className="rightCheckout">

      <div className="wrapperElemt">

 
      <CardElement options={{
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)', // Adjusted box shadow
      padding: '10px', // Added padding for spacing
      display: 'block',
      lineHeight:"5"
       // Display as block element to make it a column
    },
    invalid: {
      color: '#9e2146',
    },
  }
}}/> 
     </div>
      {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
      <button type="submit" disabled={!stripe || loading} className='checkoutButton'>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      </div>
      {
        complete &&(
            <div className="popup">
            <div className="popup-content">
            <TiTickOutline size={30} color='#45a049'/> {/* Placeholder for logo */}
              <p className="success-message">Payment Successful</p>
            </div>
          </div>
        )
      }
      
    </form>
    </>
  );
};


export default PaymentForm