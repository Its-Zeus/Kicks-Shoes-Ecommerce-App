import React, { useEffect, useState } from 'react'

const ColorPicker = ( {colors}: {colors : any[]}) => {
    const [checked , setChecked] = useState(0)
  return (
    <div className="max-w-md py-3">
            <ul className="flex flex-wrap gap-4">
                { colors &&
                    colors.map((item, idx) => (
                        <li key={idx} className={`flex-none`}>
                            <label htmlFor={item?.attributes?.color} className="block relative w-8 h-8">
                                <input id={item?.attributes?.color} type="radio" name="color" className="sr-only peer" onChange={() => setChecked(idx)}/>
                                <span id={item?.attributes?.color} className={`inline-flex justify-center items-center w-full h-full rounded-full cursor-pointer duration-150`} style={{ boxShadow: checked === idx ? `rgb(255, 255, 255) 0px 0px 0px 2px, #${item?.attributes?.color} 0px 0px 0px 5px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` : '', backgroundColor: `#${item?.attributes?.color}`}} >
                                </span>
                            </label>
                        </li>
                    ))
                }
            </ul>
        </div>
  )
}

export default ColorPicker