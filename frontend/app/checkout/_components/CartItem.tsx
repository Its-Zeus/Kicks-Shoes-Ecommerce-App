import Image from 'next/image'
import React from 'react'
import { IoTrashBinOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/_context/CartContext';



const CartItem = ({item} : any) => {
    const {user, isSignedIn, isLoaded} = useUser();
    const router = useRouter()
    const {addToCart, removeFromCart, cart, setCart, ChangeQuantity} = useCart()
  return (
    <div className='grid grid-cols-3 gap-4 bg-none mb-6'>
        <Image src={item?.product?.attributes?.photos?.data[0]?.attributes?.url} width={500} height={500} alt={item?.product?.attributes?.title} className='w-full max-h-[200px] object-cover rounded-2xl' />
        <div className='col-span-2'>
            <div className='flex flex-col justify-between h-full'>
                <div>
                    <div className='flex justify-between'>
                        <h1 className='text-lg font-semibold text-darkgrey max-w-[75%]'>{item?.product?.attributes?.title}</h1>
                        <h1 className='text-lg font-semibold text-blue'>${item?.product?.attributes?.price}</h1>
                    </div>
                    <p className='text-md text-darkgrey capitalize'>{item?.product?.attributes?.category?.data?.attributes?.title}</p>
                    <div className='flex gap-4'>
                        <p>Size: {item?.size}</p>
                        <p>Quantity: {item?.qty}</p>
                    </div>
                    </div>
                </div>    
        </div>
    </div>
  )
}

export default CartItem