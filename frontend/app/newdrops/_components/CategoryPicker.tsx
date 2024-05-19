"use client"
import React, { useEffect, useState } from 'react'

interface ColorPickerProps {
    categories: any[];
    categoryFilters: string[]; // Assuming colorFilters is an array of strings
    setCategoryFilters: any; // Assuming setColorFilters is a state updater function
  }
const CategoryPicker: React.FC<ColorPickerProps> = ( { categories, categoryFilters, setCategoryFilters }) => {
    const handleCheck = (item: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          if (!categoryFilters.includes(item)) {
            setCategoryFilters([...categoryFilters, item]);
          }
        } else {
          if (categoryFilters.includes(item)) {
            setCategoryFilters(categoryFilters.filter((color) => color !== item));
          }
        }
      };

    useEffect(() => {
    } , [categoryFilters])
  return (
    <div className="max-w-md py-3 mb-3">
            <ul className="">
                { categories &&
                    categories.map((item, idx) => (
                        <li key={idx} className={`flex items-center pb-1`}>
                            <input id={item?.attributes?.title} type="checkbox" checked={categoryFilters.includes(item?.attributes?.slug)} name="category" className="w-4 h-4 accent-darkgrey" onChange={(e) => handleCheck(item?.attributes?.slug, e)}/>
                            <label htmlFor={item?.attributes?.title} className="ml-3 font-medium capitalize">{item?.attributes?.title}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
  )
}

export default CategoryPicker