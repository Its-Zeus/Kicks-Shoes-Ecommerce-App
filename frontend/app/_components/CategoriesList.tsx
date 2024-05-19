"use client"
import React, { useEffect, useState } from 'react'
import categoryApis from '../_utils/categoryApis'
import Category from './Category'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Spacing from '../_constants/Spacing'


const CategoriesList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [categories, setCategories] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(2);
    

    const getCategory_ = async () => {
        categoryApis.getCategories(currentPage, itemsPerPage).then(res => {
            if (window.innerWidth >= 1280) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
            setCategories(res.data.data)
            setTotalPages(res.data.meta.pagination.pageCount)
        })
    }

    useEffect(() => {
        getCategory_()
        const handleResize = () => {
            getCategory_(); // Refresh categories on resize
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [currentPage, itemsPerPage])
  return (
    <div className='bg-darkgrey py-24 px-6 md:px-0'>
        <div className={`pb-12 flex m-auto ${Spacing}`}>
            <h1 className='2xl:text-[74px] xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[24px] font-semibold uppercase flex-1 2xl:leading-[70px] xl:leading-[60px] lg:leading-[50px] md:leading-[40px] sm:leading-[30px] text-white'>CATEGORIES</h1>
            <div className='flex-1 self-end'>
                <div className='flex justify-end gap-5'>
                    <button className='p-2 bg-fawhite rounded-lg disabled:opacity-30 disabled:cursor-auto' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        <GrFormPrevious color='black' size={20}/>
                    </button>
                    <button className='p-2 bg-fawhite rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-auto' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <GrFormNext color='black' size={20}/>
                    </button>
                </div>
            </div>
        </div>
        <div className={`m-auto grid gap-9 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ${Spacing}`}>
            {categories.map((category : any) => (
                <Category category={category} key={category.id}/>
            ))}
        </div>
    </div>
  )
}

export default CategoriesList