import React from 'react'
import '../index.css'
import Board from '../assets/icon-board.svg'
import Logo from '../assets/logo-light.svg'

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 bg-primary w-72 flex flex-col flex-start">

            <div className="image-container h-24  p-7">
              <img src={Logo} alt="logo" className="flex items-center justify-center h-7 w-32"></img>
            </div>
        
            <h1 className='uppercase text-secondary ml-7'>all boards (8)</h1>
            <ul className="flex flex-col flex-start ml-7 text-lg h-full">
                <li className="flex flex-start items-center flex-row
                py-7 text-gray-500 gap-2">
                    <img src={Board} alt="board"></img>
                    <p>Platform Launch</p> 
                </li>
                <li className="flex flex-start items-center flex-row
                py-7  text-purple-500  gap-2">
                  <img src={Board} alt="board"></img>
                    <p>Marketing Plan</p>
                </li>
                <li className="flex flex-start items-center flex-row
                py-7 text-gray-500 gap-2">
                  <img src={Board} alt="board"></img>
                    <p>Road Map</p>
                </li>
                <li className="flex flex-start items-center flex-row
                py-7 text-gray-500 gap-2">
                  <img src={Board} alt="board"></img>
                    Report
                </li>

            </ul>
        </div>
  )
}

export default Sidebar