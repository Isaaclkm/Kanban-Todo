import React, { useState } from 'react'
import Modal from './Modals/Modal';
import { createPortal } from 'react-dom';

const TopBar = ({columns}) => {
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className='px-7 Top min-h-1/5 max-h-24 w-full flex flew-row justify-between items-center bg-primary grow border-y	border-slate-30'>
            <h1 className='text-slate-100 text-2xl font-semibold'>Platform Launch</h1>
            <button className='rounded-full bg-morado w-40 h-12 text-slate-100 font-semibold' onClick={() => {
              setShowModal(true);
              setShowOverlay(true);
            }}> + Add new Task</button>

            {showModal && createPortal(
             <Modal onClose={() => {setShowModal(!showModal); setShowOverlay(!showOverlay)}} columns={columns} />,
            document.body
            )}


             {/* Overlay style */}
         {showOverlay && (
          <div
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'
            onClick={() => {
              setShowModal(false);
              setShowOverlay(false);
             }}
           />
          )}
          {/* Overlay Ends */}
   </div>
  )
}

export default TopBar