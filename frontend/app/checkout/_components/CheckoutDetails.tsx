"use client"
import React, { useEffect, useState } from 'react' 
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/_context/CartContext'
import CartItem from './CartItem'

const CheckoutDetails = () => {
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
    <div>
        <div className='bg-fawhite rounded-xl p-5 mb-7'>
            <h1 className='text-2xl font-semibold pb-5'>Order Summary</h1>
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
                    <p className='font-semibold'>Total</p>
                    <p className='font-semibold'>${cartTotal}</p>
                </div>
            </div>
        </div>
        <div className='bg-fawhite rounded-xl p-5'>
            <h1 className='text-2xl font-semibold pb-5'>Order Details</h1>
            {cartItems?.map((item : any, idx : number) => (
                <CartItem key={idx} item={item} />
            ))}
        </div>
    </div>
  )
}

export default CheckoutDetails