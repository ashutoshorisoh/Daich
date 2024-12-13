import React from 'react'
import { Search } from 'lucide-react'

function Nav() {
  return (
    <div className=' w-full h-[15%]  flex justify-end gap-10 pr-10 text-2xl items-center'>
        <div className='flex '>
         <input type="text" className=' rounded-l-full pt-2 pb-2 text-black' />
         <button className='bg-white text-black rounded-r-full pr-6 pt-2 pb-2 '><Search/> </button>
        </div>
        
        <button>MEMBERS</button>
        <button>LISTS</button>
        <button>SIGN UP</button>
        <button>LOGIN</button>

      </div>
  )
}

export default Nav