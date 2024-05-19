import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import Spacing from '../_constants/Spacing'
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok  } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={`m-auto pt-32 md:px-0 ${Spacing}`}>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-10 bg-blue px-10 pt-10 pb-32 text-white rounded-[40px]'>
            <div>
                <h1 className='xl:text-4xl lg:text-3xl md:text-2xl text-2xl font-semibold uppercase'>Join our KicksPlus <br/>Club & get 15% off</h1>
                <p className='pt-3 pb-5'>Sign up for free! Join the community.</p>
                <div className='flex gap-4'>
                    <input type="text" className='bg-transparent border border-[#BCBCBC] py-2 px-3 w-1/2 rounded-lg placeholder-[#BCBCBC]' placeholder='Enter your email' />
                    <button className='bg-darkgrey py-2 px-6 rounded-lg text-sm'>SUBMIT</button>
                </div>
            </div>
            <div className='m-auto flex items-center'>
              <Image src="/kicksplus.png" width={367} height={112} alt="kicks logo"/>
            </div>

        </div>
        <div className='px-10 pt-7 bg-darkgrey rounded-[40px] -mt-24 pb-12'>
          <div className='grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 '>
              <div className='col-span-2'>
                <h1 className='text-3xl text-yellow font-medium py-2'>About us</h1>
                <p className='text-gray xl:pr-28 lg:pr-18'>We are the biggest hyperstore in the universe. We got you all cover with our exclusive collections and latest drops.</p>
              </div>
              <div>
                <h1 className='text-xl text-yellow font-medium py-2'>Categories</h1>
                <ul className='text-gray'>
                  <li className='mb-2'>Runners</li>
                  <li className='mb-2'>Sneakers</li>
                  <li className='mb-2'>Basketball</li>
                  <li className='mb-2'>Outdoor</li> 
                  <li className='mb-2'>Golf</li> 
                  <li className='mb-2'>Hiking</li> 
                </ul> 
              </div>
              <div>
                <h1 className='text-xl text-yellow font-medium py-2'>Company</h1>
                <ul className='text-gray'>
                  <li className='mb-2'>About</li>
                  <li className='mb-2'>Contact</li>
                  <li className='mb-2'>Blogs</li> 
                </ul> 
              </div>
              <div>
                <h1 className='text-xl text-yellow font-medium py-2'>Follow us</h1>
                <div className='flex gap-5'>
                  <FaFacebook size={20} color='#E7E7E3'/>
                  <FaInstagram size={20} color='#E7E7E3'/>
                  <FaTwitter size={20} color='#E7E7E3'/>
                  <FaTiktok size={20} color='#E7E7E3'/>
                </div>
                <Image src="/footerlogo.png" width={367} height={112} alt="kicks logo" className='w-full py-10'/>
              </div>
          </div>
        </div>
        <h1 className='py-5 text-center flex items-center justify-center'>© All rights reserved | Made with ❤️ & <Image src="/tea.png" width={21} height={21} alt="Moroccan Tea" className='inline'/> By <Link href="https://github.com/Its-Zeus" className='text-blue ml-3'>Zeus</Link></h1>
    </div>
  )
}

export default Footer