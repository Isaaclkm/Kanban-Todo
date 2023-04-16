import React from 'react'
import './Modal.css'

const NewCol = ({onClose}) => {

  return (
    <div className='Colmodal modalOverlay overflow-y-hidden overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default'> 

        <div class="flex flex-wrap -mx-3 mb-6 text-slate-100 ">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-first-name">
                Title
            </label>
            <input class="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight  " id="grid-first-name" type="text" placeholder=""/>
            </div>
        </div>
        <button className='rounded-full bg-white w-96 h-12 text-morado font-semibold' onClick={onClose}>Add new Column</button>

    </div>
  )
}

export default NewCol