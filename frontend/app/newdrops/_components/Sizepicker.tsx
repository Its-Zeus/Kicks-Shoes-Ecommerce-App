"use client"
import React, { useEffect, useState } from 'react'

interface ColorPickerProps {
    sizes: any[];
    sizeFilters: string[]; // Assuming colorFilters is an array of strings
    setSizeFilters: any; // Assuming setColorFilters is a state updater function
  }

const Sizepicker: React.FC<ColorPickerProps> = ( { sizes, sizeFilters, setSizeFilters }) => {
    const handleCheck = (item: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          if (!sizeFilters.includes(item)) {
            setSizeFilters([...sizeFilters, item]);
          }
        } else {
          if (sizeFilters.includes(item)) {
            setSizeFilters(sizeFilters.filter((size) => size !== item));
          }
        }
      };

    useEffect(() => {
    } , [sizeFilters])
  return (
    <div className="max-w-md mb-3">
        <ul className="flex flex-wrap gap-4 py-2">
            { sizes &&
                sizes.sort().map((item , idx) => (
                    <li key={idx} className={`flex-none`}>
                        <label htmlFor={item?.attributes?.size} className="block relative w-[40px] h-[40px]">
                            <input id={item?.attributes?.size} type="checkbox" defaultChecked={idx == 3 ? true : false} name="size" className="sr-only peer" onChange={(e) => handleCheck(item?.attributes?.size, e)}/>
                            <span id={item?.attributes?.size} className={`inline-flex justify-center items-center w-full h-full rounded-lg text-sm cursor-pointer duration-150 font-semibold ${sizeFilters.includes(item?.attributes?.size) ? 'bg-darkgrey text-white' : 'bg-white text-darkgrey'}`} >{item?.attributes?.size}</span>
                        </label>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Sizepicker