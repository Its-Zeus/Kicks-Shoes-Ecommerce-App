"use client"
import Spacing from '@/app/_constants/Spacing'
import productApis from '@/app/_utils/productApis'
import React, { useEffect, useState } from 'react'
import ProductDetails from './_components/ProductDetails'
import ProductImage from './_components/ProductImage'
import ProductList from './_components/ProductList'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { space } from 'postcss/lib/list'

interface Params {
    params: {
        slug: string
    }
}
export default function Product({params} : Params) {
    const [ProductInfos, setProductInfos] = useState([])
    const [category, setCategory]  = useState("")
    const [relatedProducts, setRelatedProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1)
    const getProduct_ = () => productApis.getProductBySlug(params.slug).then(res => {
        setProductInfos(res.data.data[0])
        setCategory(res.data.data[0].attributes?.category?.data?.attributes?.slug)
    })
    const getRelatedProducts_ = () => productApis.getProductbyCategory(category, currentPage, itemsPerPage).then(res => {
        console.log(ProductInfos)
        if (window.innerWidth >= 1800) {
            setItemsPerPage(5);
        } else if (window.innerWidth >= 1280) {
            setItemsPerPage(4);
        } else if (window.innerWidth >= 1024) {
            setItemsPerPage(3);
        } else {
            setItemsPerPage(2);
        }
        setRelatedProducts(res.data.data)
        setTotalPages(res.data.meta.pagination.pageCount)
    })
    useEffect(() => {
        getProduct_()
        getRelatedProducts_()
        const handleResize = () => {
            getRelatedProducts_(); // Refresh categories on resize
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [category, currentPage, itemsPerPage])
    useEffect(() => {
        
    })
    return (
        <div className={`${Spacing}`}>
            <div className='grid md:grid-cols-2 grid-cols-1 py-10 gap-9'>
                <ProductImage product={ProductInfos}/>
                <ProductDetails product={ProductInfos}/>
            </div>
            <div>
                <div className={`pb-5 flex m-auto`}>
                    <h1 className='2xl:text-[40px] xl:text-[30px] lg:text-[30px] md:text-[30px] sm:text-[30px] text-[24px] font-semibold flex-1 text-darkgrey'>You may also like</h1>
                <div className='flex-1 self-end'>
                    <div className='flex justify-end gap-5'>
                        <button className='p-2 bg-darkgrey rounded-lg disabled:opacity-30 disabled:cursor-auto' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            <GrFormPrevious color='white' size={20}/>
                        </button>
                        <button className='p-2 bg-darkgrey rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-auto' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            <GrFormNext color='white' size={20}/>
                        </button>
                    </div>
                </div>
            </div>
            <ProductList products={relatedProducts} />
            <div className='flex gap-2 py-4 justify-center'>
                {
                    Array.from({ length: totalPages }).map((_, i) => {
                        return <span key={i} className={`w-10 h-1 rounded-3xl ${currentPage === i + 1 ? 'bg-blue' : 'bg-darkgrey opacity-25'}`}></span>
                    })
                }
            </div>
            </div>
            
        </div>
    )
}