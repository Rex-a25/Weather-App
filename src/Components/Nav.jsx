import React from 'react'

const Nav = () => {
  return (
    <div className='bg-blue-950  py-4'>
      <ul className='flex items-center justify-between gap-60 px-20'>
        <li className='text-white'><a href="/"> Weather Now</a></li>
        <li> <button className='text-white bg-[#242445] rounded-md  w-15 h-7'> Links </button></li>
      </ul>
    </div>
  )
}

export default Nav
