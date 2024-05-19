import React from 'react'
import ColorPicker from './ColorPicker'
import Sizepicker from './Sizepicker'
import CategoryPicker from './CategoryPicker'

interface FiltesProps {
  Colors: any[];
  colorFilters: string[]; // Assuming colorFilters is an array of strings
  setColorFilters: any; // Assuming setColorFilters is a state updater function
  Sizes: any[];
  sizeFilters: string[]; // Assuming sizeFilters is an array of strings
  setSizeFilters: any; // Assuming setSizeFilters is a state updater function
  Categories: any[];
  categoryFilters: string[]; // Assuming categoryFilters is an array of strings
  setCategoryFilters: any; // Assuming setCategoryFilters is a state updater function
}
const Filters : React.FC<FiltesProps>  = ( { Colors, colorFilters, setColorFilters, Sizes, sizeFilters, setSizeFilters, Categories, categoryFilters, setCategoryFilters }) => {
  
  return (
    <div>
      <div className="collapse collapse-arrow border border-base-300 bg-base-200 mb-4">
        <input type="checkbox" defaultChecked className="peer" /> 
        <div className="collapse-title text-md font-semibold">
            COLORS
        </div>
        <div className="collapse-content"> 
            <ColorPicker colors={Colors} colorFilters={colorFilters} setColorFilters={setColorFilters}/>
        </div>
      </div>
      <div className="collapse collapse-arrow border border-base-300 bg-base-200 mb-4">
        <input type="checkbox" defaultChecked className="peer" /> 
        <div className="collapse-title text-md font-semibold">
            SIZES
        </div>
        <div className="collapse-content"> 
        <Sizepicker sizes={Sizes} sizeFilters={sizeFilters} setSizeFilters={setSizeFilters} />
        </div>
      </div>
      <div className="collapse collapse-arrow border border-base-300 bg-base-200 mb-4">
        <input type="checkbox" defaultChecked className="peer" /> 
        <div className="collapse-title text-md font-semibold">
            CATEGORIES
        </div>
        <div className="collapse-content"> 
        <CategoryPicker categories={Categories} categoryFilters={categoryFilters} setCategoryFilters={setCategoryFilters} />
        </div>
      </div>
      {/* <h2 className='text-md font-semibold'>COLOR</h2>
      <ColorPicker colors={Colors} colorFilters={colorFilters} setColorFilters={setColorFilters}/> */}
      {/* <h2 className='text-md font-semibold'>SIZE</h2>
      <Sizepicker sizes={Sizes} sizeFilters={sizeFilters} setSizeFilters={setSizeFilters} />
      <h2 className='text-md font-semibold'>CATEGORY</h2>
      <CategoryPicker categories={Categories} categoryFilters={categoryFilters} setCategoryFilters={setCategoryFilters} /> */}
    </div>
  )
}

export default Filters