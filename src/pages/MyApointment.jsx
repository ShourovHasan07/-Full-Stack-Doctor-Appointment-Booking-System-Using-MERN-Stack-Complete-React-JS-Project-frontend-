import React, { useContext } from 'react'
import { doctors } from './../assets/assets_frontend/assets';
import { AppContext } from './../context/AppContext';

const MyApointment = () => {

   const {doctors} = useContext(AppContext)

  return (
    <div>
     <p className=' pb-3 mt-12  font-medium text-zinc-700 border-b '>My appointments</p>
        <div className='flex flex-col'>
          {
            doctors.slice(0,3).map((item,index)=>(
              <div className='grid grid-cols-[1fr_2fr] gap-4 sm:gap-6 sm:flex py-2 border-b ' key={index}>

              <div className='w-32 bg-indigo-50'>
                <img src={item.image} alt="" />
              </div>

               <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.name }</p>
                <p>{item.speciality }</p>
                <p className='text-zinc-700 font-medium mt-1'> Address</p>
                <p className='text-xs'>{item.address.line1 }</p>
                <p className='text-xs'>{item.address.line2 }</p>
                <p className='text-xs mt-1'>  <span className='text-sm text-neutral-800 font-medium'>Date & Time:</span>  25, July, 2024 |  8:30 PM</p>
               </div>
                <div></div>

                <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 px-4 border border-stone-300 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ease-in-out'>
  Pay here
</button>
<button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 px-4 border border-stone-300 rounded-lg hover:bg-red-600 hover:text-white transition duration-300 ease-in-out'>
  Cancel appointment
</button>
                </div>

              </div>
            ))
          }
        </div>
      
    </div>
  )
}

export default MyApointment