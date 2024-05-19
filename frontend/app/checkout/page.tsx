"use client"
import React, { useEffect } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import Spacing from '../_constants/Spacing';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCart } from '../_context/CartContext';
import CheckoutDetails from './_components/CheckoutDetails';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const page = () => {
    const {user, isSignedIn, isLoaded} = useUser();
    const {cartTotal, setCartTotal} = useCart()
    const {cart, setCart} = useCart()
    console.log(cartTotal)
    const router = useRouter();
    const options = {
        mode : 'payment',
        amount: cartTotal * 100,
        currency: 'usd',
        font: 'Rubik',
      };

    useEffect(() => {
        console.log(cart)
    }, [cart])
  return (
    isSignedIn ? (
        cartTotal > 0 && (
            <div className={`${Spacing} py-10`}>
                <div className='lg:grid grid-cols-2 gap-10'>
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm amount = {cartTotal}/>
                    </Elements>
                    <div className='mt-8 lg:mt-0'>
                        <CheckoutDetails/>
                    </div>
                </div>
            </div>
        )
        
    ) :
    router.push('/cart')

  )
}

export default page