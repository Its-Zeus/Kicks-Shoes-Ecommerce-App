"use client"
import React, { useEffect, useState } from 'react'

const ColorPicker = ( {colors}: {colors : string[]}) => {
    const [checked , setChecked] = useState(0)
    console.log(colors)
    const colorss = [{ bg: "bg-[#2563EB]", ring: "ring-[#2563EB]" }, { bg: "bg-[#8B5CF6]", ring: "ring-[#8B5CF6]" }, { bg: "bg-[#DB2777]", ring: "ring-[#DB2777]" }, { bg: "bg-[#475569]", ring: "ring-[#475569]" }, { bg: "bg-[#EA580C]", ring: "ring-[#EA580C]" }]
  return (
    <div className="max-w-md py-3">
            <ul className="flex flex-wrap gap-4">
                { colors &&
                    colors.map((item, idx) => (
                        <li key={idx} className={`flex-none`}>
                            <label htmlFor={item} className="block relative w-8 h-8">
                                <input id={item} type="radio" defaultChecked={idx == 1 ? true : false} name="size" className="sr-only peer" onChange={() => setChecked(idx)}/>
                                <span id={item} className={`inline-flex justify-center items-center w-full h-full rounded-full cursor-pointer duration-150 ${checked === idx ? 'bg-darkgrey text-white' : 'bg-white text-darkgrey'}`} >{item}</span>
                            </label>
                        </li>
                    ))
                }
            </ul>
        </div>
  )
}

export default ColorPicker