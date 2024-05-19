"use client"
import React, { useEffect, useState } from 'react'

interface ColorPickerProps {
    colors: any[];
    colorFilters: string[]; // Assuming colorFilters is an array of strings
    setColorFilters: any; // Assuming setColorFilters is a state updater function
  }
const ColorPicker: React.FC<ColorPickerProps> = ( { colors, colorFilters, setColorFilters }) => {
    const handleCheck = (item: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          if (!colorFilters.includes(item)) {
            setColorFilters([...colorFilters, item]);
          }
        } else {
          if (colorFilters.includes(item)) {
            setColorFilters(colorFilters.filter((color) => color !== item));
          }
        }
      };

    useEffect(() => {
    } , [colorFilters])
  return (
    <div className="max-w-md py-3 mb-3">
            <ul className="flex flex-wrap gap-4">
                { colors &&
                    colors.map((item, idx) => (
                        <li key={idx} className={`flex-none`}>
                            <label htmlFor={item?.attributes?.color} className="block relative w-[40px] h-[40px]">
                                <input id={item?.attributes?.color} type="checkbox" name="color" className="sr-only peer" onChange={(e) => handleCheck(item?.attributes?.color, e)}/>
                                <span id={item?.attributes?.color} className={`inline-flex justify-center items-center w-full h-full rounded-lg cursor-pointer duration-150`} style={{ boxShadow: colorFilters.includes(item?.attributes?.color) ? `rgb(255, 255, 255) 0px 0px 0px 2px, #${item?.attributes?.color} 0px 0px 0px 5px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` : '', backgroundColor: `#${item?.attributes?.color}`}} >
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white absolute inset-0 m-auto z-0 pointer-events-none hidden peer-checked:block duration-150">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </label>
                        </li>
                    ))
                }
            </ul>
        </div>
  )
}

export default ColorPicker