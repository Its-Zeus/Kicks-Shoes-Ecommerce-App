import React from 'react'
import { TypewriterEffectSmoothDemo } from './HeroText'
import Spacing from '../_constants/Spacing'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <div>
      {/* <h1 className='2xl:text-[223.5px] xl:text-[180px] lg:text-[135px] md:text-[110px] sm:text-[90px] text-[70px] uppercase font-bold text-center'>
        <span className="text-darkgrey ">Do it </span>
        <span className="text-blue">right</span>
      </h1> */}
      <div className={`m-auto max-h-[700px] py-6 ${Spacing}`}>
          <Image src='/slogan.png' width={1320} height={500} className='object-cover w-full h-full ' alt='slogan'/>
      </div>
      <div className={` m-auto max-h-[700px] relative rounded-[64px] ${Spacing}`}>
        <Image src='/shoes.jpg' width={1320} height={500} className='object-cover rounded-3xl sm:rounded-[40px] md:rounded-[64px] w-full h-full max-h-[500px]' alt='shoes'/>
        <div className='absolute top-0 left-0 w-full h-full rounded-[64px] bg-gradient-to-t from-[#000] to-transparent opacity-80'></div>
        <div className='absolute bottom-12 md:left-12 sm:left-14 left-8 z-10 text-gray'>
            <h2 className='lg:text-[55px] md:text-[40px] font-semibold uppercase'>NIKE AIR MAX</h2>
            <p className='lg:text-[20px] md:text-[17px] max-w-[400px] mb-4'>Nike introducing the new air max for everyone's comfort</p>
            <Link href={'/newdrops'} className='uppercase bg-blue text-white py-2 px-6 text-[14px] rounded-lg'>Shop Now</Link>
        </div>
        <div className='absolute top-14 left-0 z-10 text-gray hidden sm:block'>
          <h2 className='[writing-mode:vertical-lr] rotate-180 px-4 py-4 bg-darkgrey rounded-l-xl lg:text-base text-xs'>Nike product of the year</h2>
        </div>
      </div>
      {/* <TypewriterEffectSmoothDemo/> */}
    </div>
  )
}

export default Hero