import React from 'react'
import '../index.css'
import Board from '../assets/icon-board.svg'

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 bg-dark[2B2C37] w-40">
            <h1 className="flex items-center justify-center text-2xl
            h-16 bg-purple-600 text-white font-bold">hussle</h1>

            <ul className="flex flex-col text-lg h-full">
                <li className="flex justify-center items-center flex-row
                py-7 text-gray-500">
                    <img src={Board} alt="board"></img>
                    <p>Create Project</p> 
                </li>
                <li className="flex justify-center items-center flex-col
                py-7 border-l-4 border-purple-500 text-purple-500
                font-bold">
                  <img src={Board} alt="board"></img>
                    Boards
                </li>
                <li className="flex justify-center items-center flex-col
                py-7 text-gray-500">
                  <img src={Board} alt="board"></img>
                    Schedule
                </li>
                <li className="flex justify-center items-center flex-col
                py-7 text-gray-500">
                  <img src={Board} alt="board"></img>
                    Report
                </li>

                <li className="flex justify-center items-center flex-col
                py-7 text-gray-500 mt-auto mb-16">
                  <img src={Board} alt="board"></img>
                    Settings
                </li>
            </ul>
        </div>
  )
}

export default Sidebar