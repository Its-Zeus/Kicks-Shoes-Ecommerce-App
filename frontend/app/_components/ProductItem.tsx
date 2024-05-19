import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductItem = ( {product} : any) => {
  return (
    <Link href={`/product/${product.attributes.slug}`}>
        <div className='rounded-3xl relative'>
            <Image src={product.attributes.photos.data[0].attributes.url} width={300} height={300} alt={product.attributes.title} className='object-cover rounded-3xl outline outline-[#FFF] outline-[6px] w-full'/>
            <h3 className='absolute top-0 left-0 text-white bg-blue px-4 py-2 rounded-tl-3xl rounded-br-3xl text-xs'>New</h3>
        </div>
        <div className='py-4'>
            <h1 className='2xl:text-[16px] font-bold line-clamp-1 leading-6'>{product.attributes.title}</h1>
        </div>
        <button className='uppercase bg-darkgrey py-3 text-[14px] w-full text-center rounded-[8px]'>
            <span className='text-white'>view product - </span>
            <span className='text-yellow'>${product.attributes.price}</span>
            </button>
    </Link>
  )
}

export default ProductItem