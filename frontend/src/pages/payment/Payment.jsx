import { useState , useEffect } from "react";
import "./payment.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios"
//import dotenv from 'dotenv';

const PaymentPage = () => {

    const [stripeToken,setStripeToken]=useState(null)
    const KEY="pk_test_51Pp4vH01nfJPbaYzsgISrtJ9kjPRGw5YlOzQ5YVE31vDuiTMsMtqY1xywxJNAmGHzAkQhQSWHLmiihNJlDZsbRvP008pVcy9jb"
    
    const onToken = (token) => {
      setStripeToken(token);
      console.log(token);
    };

    useEffect(()=>{

const makeRequest = async ()=>{
    try {
        const response = await axios.post("http://localhost:5000/api/checkout/payment",{
            tokenId: stripeToken.id,
            amount: 2000,

        })
        console.log("Response: ",response.data)
    } catch (error) {
        console.log(error)
    }
}

stripeToken && makeRequest
    },[stripeToken])

  return ( 
    <div className="payment-page">
      <StripeCheckout 
        name="Ammar Store" 
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKK0mQ82VAPeVgVK1LzVq-XKHEkzbDNYpIw&s"
        billingAddress
        shippingAddress
        description="Your total is $20"
        amount={2000}
        token={onToken}
        //stripeKey={process.env.STRIPE_KEY_PUBLIC}
        stripeKey={KEY}
        >
        <button className="pay-now-button">Pay Now</button>
      </StripeCheckout>
    </div>
  );
};

export default PaymentPage;
