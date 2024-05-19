import React, { useEffect, useState } from 'react'
import ColorPicker from './ColorPicker';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/_context/CartContext';


const ProductDetails = ( {product}: any) => {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedsize , setSelectedsize] = useState(0)
    const [size, setSize] = useState("")
    // Function to handle changes in the selected color
    const router = useRouter()
    const {user} = useUser();
    const {addToCart, removeFromCart, cart, setCart} = useCart()
    const HandleAddToCart = () => {
        if (!user) {
            router.push('/sign-in?next=/product/[slug]')
        }
        else {
            const payload = {
                data : {
                    email : user.primaryEmailAddress?.emailAddress,
                    product : [{
                        productid : product.id,
                        qty : 1,
                        size : size
                    }]

                }
            }
            addToCart(payload)
        }
    }
    const HandleRemoveFromCart = () => {
        if (!user) {
            router.push('/sign-in?next=/product/[slug]')
        }
        else {
            const payload = {
                data : {
                    email : user.primaryEmailAddress?.emailAddress,
                    product : [{
                        productid : product.id,
                        qty : 1,
                        size : size
                    }]

                }
            }
            removeFromCart(payload)
        }
    }
    useEffect(() => {
        product && setSize(product.attributes?.sizes?.data[0]?.attributes?.size)
    }, [product])
  return (
    <div>
        <h1 className='text-3xl font-semibold'>{product.attributes?.title}</h1>
        <h2 className='text-xl text-blue font-semibold pt-2'>${product.attributes?.price}</h2>
        <div className='mt-3'>
            <h2 className='text-lg font-semibold'>COLOR</h2>
            <ColorPicker colors={product.attributes?.colors?.data} />
        <div className='mt-3'>
            <h2 className='text-lg font-semibold'>SIZE</h2>
            <ul className="flex flex-wrap gap-4 py-2">
                { product.attributes?.sizes?.data &&
                    product.attributes?.sizes?.data.sort().map((item : any, idx : number) => (
                        <li key={idx} className={`flex-none`}>
                            <label htmlFor={item?.attributes?.size} className="block relative w-[50px] h-[50px]">
                                <input id={item?.attributes?.size} type="radio" defaultChecked={idx == 3 ? true : false} name="size" className="sr-only peer" onChange={() => {setSelectedsize(idx), setSize(item?.attributes?.size)}}/>
                                <span id={item?.attributes?.size} className={`inline-flex justify-center items-center w-full h-full rounded-lg cursor-pointer duration-150 font-semibold ${selectedsize === idx ? 'bg-darkgrey text-white' : 'bg-white text-darkgrey'}`} >{item?.attributes?.size}</span>
                            </label>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div className='flex gap-2 py-6 flex-wrap sm:flex-nowrap'>
            <button className='bg-darkgrey text-white py-3 rounded-xl w-[300px]' onClick={() => HandleAddToCart()}>ADD TO CART</button>
            <button className='bg-blue text-white py-3 rounded-xl w-[300px]'>BUY NOW</button>
        </div>
        <div>
            <h2 className='text-lg font-semibold py-2'>ABOUT THIS PRODUCT</h2>
            {/* <BlocksRenderer content={product.attributes?.description} /> */}
            {
                product.attributes?.description && 
                product.attributes?.description.map((item : any, idx : number) => {
                    if (item.type === 'paragraph') {
                        return (
                          <p className='text-base text-darkgrey leading-6' key={idx}>
                            {item.children[0].text}
                          </p>
                        );}
                    else if (item.type === 'list') {
                        return (
                          <ul className='text-base text-darkgrey leading-6 list-disc ml-7 py-1' key={idx}>
                            {item.children.map((item : any, idx : number) => (
                              <li key={idx}>{item.children[0].text}</li>
                            ))}
                          </ul>
                        );
                    }
                })
            }
        </div>
        </div>
    </div>
  )
}

export default ProductDetails