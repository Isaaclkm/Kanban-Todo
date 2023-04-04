import React from 'react'
import '../index.css'
import Board from '../assets/icon-board.svg'
import Logo from '../assets/logo-light.svg'

const Sidebar = () => {
  return (
    <div className=" inset-y-0 left-0 bg-primary w-72 flex flex-col flex-start">

            <div className="image-container h-24  p-7">
              <img src={Logo} alt="logo" className="flex items-center justify-center h-6 w-36"></img>
            </div>
        
            <h1 className='uppercase text-gray-400 ml-7 my-7 tracking-widest'>all boards (8)</h1>
            <ul className="flex flex-col flex-start ml-7 text-base h-full space-y-6">
                <li className="flex flex-start items-center flex-row
                py-3	text-gray-400 gap-3.5 h-7 ">
                    <img src={Board} alt="board"></img>
                    <p>Platform Launch</p> 
                </li>
                <li className="flex flex-start items-center flex-row
                py-3	text-gray-400 gap-3.5 h-7">
                  <img src={Board} alt="board"></img>
                    <p>Marketing Plan</p>
                </li>
                <li className="flex flex-start items-center flex-row
                py-3	text-gray-400 gap-3.5 h-7">
                  <img src={Board} alt="board"></img>
                    <p>Road Map</p>
                </li>
                <li className="flex flex-start items-center flex-row
                py-3	text-purple-400 gap-3.5 h-7">
                  <img src={Board} alt="board" className='color-purple'></img>
                    + Create New Board
                </li>

            </ul>
        </div>
  )
}

export default Sidebar