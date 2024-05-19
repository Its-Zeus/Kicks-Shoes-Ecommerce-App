"use client"
import React, { useEffect, useState } from 'react'
import ReviewItem from './ReviewItem'
import reviewApis from '../_utils/reviewApis'
import Spacing from '../_constants/Spacing'

const ReviewSection = () => {
    const [Reviews, setReviews] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const getReviews_ = () => {
        reviewApis.getReviews(itemsPerPage).then(res => {
            if (window.innerWidth >= 1800) {
                setItemsPerPage(4);
            } else if (window.innerWidth >= 1280) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 640) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
                setReviews(res.data.data);
        })
    }
    useEffect(() => {
        getReviews_()
        const handleResize = () => {
            getReviews_(); // Refresh categories on resize
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [itemsPerPage])
  return (
    <div className='px-6 md:px-0'>
            <div className={`pt-20 flex m-auto ${Spacing}`}>
    <h1 className='2xl:text-[74px] xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[24px] font-semibold uppercase flex-1 2xl:leading-[70px] xl:leading-[60px] lg:leading-[50px] md:leading-[40px] sm:leading-[30px] text-darkgrey'>REVIEWS</h1>
    <div className='flex-1 text-right self-end'>
        <button className='bg-blue uppercase text-white py-3 px-6 text-[14px] rounded-lg'>SEE ALL</button>
    </div>
    </div>
    <div className={`pt-12 m-auto grid sm:grid-cols-2 grid-cols-1 xl:grid-cols-3 3xl:grid-cols-4 gap-9 ${Spacing}`}>
        {
            Reviews.map((review : any, index) => (
                console.log(index),
                <ReviewItem review={review} key={review.id} className={index == 2 && 'hidden lg:block' || index == 1 && 'hidden sm:block'}/>
            ))
        }
    </div>
    </div>
  )
}

export default ReviewSection