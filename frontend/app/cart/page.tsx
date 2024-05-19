"use client"
import React, { useEffect, useState } from 'react'
import Spacing from '../_constants/Spacing'
import { useCart } from '../_context/CartContext'
import CartItem from './_component/CartItem'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const page = () => {
    const {cartItems , setCartItems} = useCart()
    const [cartTotal, setCartTotal] = useState(0)
    const [cartCount , setCartCount] = useState(0)
    const rounter = useRouter();
    const {user} = useUser();
    const getCartTotal = () => {
        let total = 0;
        cartItems?.forEach((element: any) => {
            total += (element.product.attributes.price * element.qty);
        });
        return total;
      };
      
      const getItemCount = () => {
        let count = 0;
        cartItems?.forEach((element: any) => {
            count += element.qty;
        });
        return count;
      }
      useEffect(() => {
        if (user) {
          const total = getCartTotal();
          setCartTotal(total);
          const count = getItemCount();
          setCartCount(count);
        }
      }, [cartItems]);
  return ( 
    <div className={`${Spacing} lg:grid grid-cols-3 gap-5 py-10`}>
        <div className='col-span-2 bg-fawhite p-4 lg:p-7 rounded-xl mb-10 lg:mb-0'>
            <h1 className='text-2xl font-semibold'>Your Bag</h1>
            <p className='text-sm text-darkgrey opacity-80 mt-1 mb-6'>Items in your bag not reserved- check out now to make them yours.</p>
            {cartItems?.map((item : any, idx : number) => (
                <CartItem key={idx} item={item} />
            ))}
        </div>
        <div className='bg-fawhite lg:p-0  px-7 p-4 lg:pb-7 rounded-xl lg:bg-transparent'>
            <h1 className='text-2xl font-semibold py-5'>Order Summary</h1>
            <div className='flex flex-col gap-1'>
                <div className='flex flex-row justify-between'>
                    <p>{cartCount} items</p> 
                    <p>${cartTotal}</p>
            </div>
            <div className='flex flex-row justify-between'>
                    <p>Delivery</p>
                    <p>$0</p>
            </div>
            <div className='flex flex-row justify-between'>
                    <p>Sales Tax</p>
                    <p>-</p>
                </div>
            <div className='flex flex-row justify-between'>
                    <p>Total</p>
                    <p>${cartTotal}</p>
                </div>
            </div>
            <button className='w-full bg-darkgrey text-fawhite rounded-lg py-2 mt-5 uppercase' onClick={() => rounter.push("/checkout")}>Checkout</button>
        </div>
    </div>
  )
}

export default page