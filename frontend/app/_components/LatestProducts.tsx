"use client"
import React, { useEffect, useState } from 'react'
import productApis from '../_utils/productApis'
import ProductList from './ProductList'
import Spacing from '../_constants/Spacing'
import Link from 'next/link'

const LatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState([])
    useEffect(() => {
        getLatestProducts_()
    }, [])
    const getLatestProducts_ = () => {
        productApis.getLatestProducts().then(res => {
            //console.log(res.data)
            setLatestProducts(res.data.data)
        })
    }
  return (
    <div>
        <div className={`pt-20 flex m-auto ${Spacing}`}>
            <h1 className='2xl:text-[74px] xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[24px] font-semibold uppercase flex-1 2xl:leading-[70px] xl:leading-[60px] lg:leading-[50px] md:leading-[40px] sm:leading-[30px] text-darkgrey'>Don’t miss out new drops</h1>
            <div className='flex-1 text-right self-end'>
                <Link className='bg-blue uppercase text-white py-3 px-6 text-[14px] rounded-lg' href={"/newdrops"}>SHOP NEW DROPS</Link>
            </div>
        </div>
        <div className='py-12'><ProductList products={latestProducts}/></div>
    </div>
  )
}

export default LatestProducts