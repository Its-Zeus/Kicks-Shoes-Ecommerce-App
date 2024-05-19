import Image from 'next/image'
import React from 'react'
import SelectMenu from './SelectMenu'
import QtyMenu from './QtyMenu'
import { IoTrashBinOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/_context/CartContext';



const CartItem = ({item} : any) => {
    const {user, isSignedIn, isLoaded} = useUser();
    const router = useRouter()
    const {addToCart, removeFromCart, cart, setCart, ChangeQuantity} = useCart()
    const HandleRemoveFromCart = () => {
        if (!user) {
            router.push('/sign-in?next=/product/[slug]')
        }
        else {
            const payload = {
                data : {
                    email : user.primaryEmailAddress?.emailAddress,
                    product : [{
                        productid : item.product.id,
                        qty : 1,
                        size : item.size
                    }]

                }
            }
            removeFromCart(payload)
        }
    }
    const HandleQuantityChange = (e : any) => {
        console.log(e.target.value)
        if (!user) {
            router.push('/sign-in?next=/product/[slug]')
        }
        else {
            const payload = {
                data : {
                    email : user.primaryEmailAddress?.emailAddress,
                    product : [{
                        id: item.id,
                        productid : item.product.id,
                        qty : parseInt(e.target.value),
                        size : item.size
                    }]

                }
            }
            console.log(payload)
            ChangeQuantity(payload)
        }
    }
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
                    <p>Size: {item?.size}</p>
                    {/* <div className='flex gap-4 self-end my-5'>
                        <div className='flex items-center gap-2'>
                            <p>Size</p>
                            <SelectMenu options={item?.product?.attributes?.sizes?.data} />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p>Quantity</p>
                            <QtyMenu options={[1,2,3,4,5,6,7,8,9,10]} defaultValue={item?.qty} />
                        </div>
                    </div> */}
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex items-center gap-2'>
                            <p>Quantity</p>
                            <input type="number" id="Quantity" defaultValue={item?.qty} min={1} className="h-10 w-24 rounded-lg border-gray-200 sm:text-sm" onChange={(e) => HandleQuantityChange(e)} />
                            {/* <QtyMenu options={[1,2,3,4,5,6,7,8,9,10]} defaultValue={item?.qty} onChange={HandleQuantityChange} /> */}
                    </div>
                    <div className='flex flex-row gap-4 mb-1'>
                        <div className='hover:bg-darkgrey/20 rounded-3xl h-full p-2'>
                            <IoTrashBinOutline size={25} color='#232321' onClick={(e) => HandleRemoveFromCart()} role='button' />
                        </div>
                        <div className='hover:bg-darkgrey/20 rounded-3xl h-full p-2'>
                            <FiHeart size={25} color='#232321'/>
                        </div>
                        
                     </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem