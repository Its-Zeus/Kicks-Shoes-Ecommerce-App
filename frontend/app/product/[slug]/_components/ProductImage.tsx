import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';

const ProductImage = ({product} : any) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


  return (
    <div className=''>
        <Swiper
        style={{
          '--swiper-navigation-color': '#4A69E2',
          '--swiper-pagination-color': '#4A69E2',
        }}
        spaceBetween={10}
        pagination={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiper2 w-[100%] max-w-[550px] aspect-square"
      >
        {product.attributes?.photos?.data.map((item : any, idx : number) => (
                <SwiperSlide key={idx}>
                    <img src={item.attributes.url} className='rounded-2xl'/>
                </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper w-[90%] max-w-[550px]"
      >
                {product.attributes?.photos?.data.map((item : any, idx : number) => (
                <SwiperSlide key={idx}>
                    <img src={item.attributes.url} className='rounded-2xl' />
                </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductImage