import React from 'react'
import Image from 'next/image'
import {Rating} from '@mui/material'

const ReviewItem = ({review, className} : any) => {
  return (
    <div className={className}>
        <div className='flex gap-9 py-5 bg-white px-5 rounded-t-3xl'>
            <div>
                <h2 className='text-[20px] font-semibold'>{review.attributes?.title}</h2>
                <p className='text-[14px] line-clamp-1'>{review.attributes?.description}</p>
                <div className='flex items-center gap-2'>
                    <Rating value={review.attributes?.rating}/>
                    <p className=''>{review.attributes?.rating}.0</p>
                </div>
            </div>
            <Image src={review.attributes?.userphoto?.data?.attributes?.url} width={50} height={50} alt='User Photo' objectFit='cover' className='object-cover aspect-square rounded-full max-h-[50px]'/>
        </div>
        <Image src={review.attributes?.reviewphoto?.data?.attributes?.url} width={500} height={500} alt='User Photo' objectFit='cover' className='object-cover w-full h-auto aspect-square rounded-b-3xl'/>
    </div>
  )
}

export default ReviewItem