import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import Column from './Column'
import Modal from './Modal';

const Board = () => {
  const bg = {
    overlay: {
      backgroundColor: "#FFFF00"
    }
  }
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [verdad, setVerdad] = useState(false)
    const data = [
        {   id: '1',
            title: 'Todo'},
            {   id: '2',
            title: 'Doing'},
            
    ]
  return (
    <div className='Board flex flex-col grow border-slate-600'>
        <div className='px-7 Top h-24 w-full flex flew-row justify-between items-center bg-primary grow'>
            <h1 className='text-slate-100 text-2xl font-semibold'>Platform Launch</h1>
            <button className='rounded-full bg-morado w-40 h-12 text-slate-100 font-semibold' onClick={() => {
              setShowModal(true);
              setShowOverlay(true);
            }}> + Add new Task</button>

            {showModal && createPortal(
             <Modal onClose={() => {setShowModal(!showModal); setShowOverlay(!showOverlay)}} />,
            document.body
            )}

        </div>


        <div className='Column  w-full h-full bg-third flex flex-row flex-1'>
            {verdad ? 'No column' : data.map((title, id) => {
            return <Column data = {title} key= {id} showOverlay={showOverlay}/>
             })}
           
             <div className="w-72 h-full bg-third child:ml-4 child:mb-5 flex flex-col justify-center content-center">
                <button className='rounded-full bg-third w-64 h-12 text-morado font-semibold'>+New Column</button>
             </div>
        </div>
        
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

export default Board