import React from 'react'
import { Link } from 'react-router-dom'
import InputBox from '../common/InputBox'
import { Facebook01Icon, Facebook02Icon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'hugeicons-react'

const Footer = () => {
  return (
    <div className='text-xs flex flex-col items-center md:border-0 border-t border-t-black/15 gap-4 lg:gap-2 p-5 w-full '>
      <div className='hidden md:block'>
        <ul className='flex gap-5 flex-wrap leading-1 lg:leading-5 justify-center'>
            <Link>CUSTOMER CARE</Link>
            <Link>LOCATION</Link>
            <Link>COUNTRY/REGION: INDIA</Link>
            <Link>EMAIL SIGNUP</Link>
            <Link>SITE MAP</Link>
            <Link>FACEBOOK</Link>
            <Link>INSTAGRAM</Link>
            <Link>X</Link>
            <Link>PINTEREST</Link>
        </ul>
      </div>

      <div className='flex flex-col gap-5 md:hidden items-center text-center'>
        <h1>EMAIL SIGNUP</h1>
        <p>Sign up for newsletters and personalized shopping reminders about your Wishlist and Shopping Bag.</p>

        <form action="" className='w-full px-5'>
            <InputBox type='email' placeholder='Email address' />
        </form>

        <div>
            <ul className='flex gap-4'>
                <Link><Facebook02Icon width="15px" /></Link>
                <Link><TwitterIcon width="15px" /></Link>
                <Link><InstagramIcon width="15px" /></Link>
                <Link><YoutubeIcon width="15px" /></Link>
            </ul>
        </div>

      <Link>COUNTRY/REGION: INDIA</Link>
      </div>

      <div>
        <ul className='flex gap-1 md:gap-5 text-[0.7rem] flex-wrap justify-center text-gray-500'>
            <li>© 2025 jacstudios.com</li>
            <Link>Terms & Conditions</Link>
            <Link>Privacy Policy</Link>
            <Link>Cookies</Link>
            <Link>Accessibility</Link>
        </ul>
      </div>
    </div>
  )
}

export default Footer
