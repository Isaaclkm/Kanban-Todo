import React, { useState } from 'react'
import '../index.css'
import boardIcon from '../assets/icon-board.svg'
import Logo from '../assets/logo-light.svg'
import { createPortal } from 'react-dom';
import { useQuery, gql } from "@apollo/client";
import NewBoard from './Modals/NewBoard';
import { Link, useParams } from 'react-router-dom';


const Sidebar = ({projects, onProjectSelect }) => {
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);



  
  return (
    <div className="bg-primary w-1/5 h-screen flex-shrink-0 flex-col flex-start border-x	border-slate-300">

            <div className="image-container h-24  p-7">
              <img src={Logo} alt="logo" className="flex items-center justify-center h-6 w-36"></img>
            </div>
        
            <h1 className='uppercase text-gray-400 ml-7 my-7 tracking-widest'>all boards </h1>
            <ul className="flex flex-col flex-start ml-7 text-base h-full space-y-6">
                {/* {boards} */}
                
                   {projects.map((project) => (
                     <li className="flex flex-start items-center flex-row
                     py-3	text-gray-400 gap-3.5 h-7 "key={project._id}>
                      <img src={boardIcon} alt="board-icon"></img>
                      <Link to={`/project/${project._id}`} onClick={() => onProjectSelect(project._id)}>{project.name}</Link>
                     </li>
                     ))}
                          
            
              <button onClick={() => {
              setShowBoardModal(true);
              setShowOverlay(true);
              }}>
                <li className="flex flex-start items-center flex-row
                py-3	text-purple-400 gap-3.5 h-7">
                  <img src={boardIcon} alt="board-icon" className='color-purple'></img>
                    + Create New Board
                </li> 
                </button> 
              {showBoardModal && createPortal(
              <NewBoard onClose={() => {
                setShowBoardModal(!showBoardModal); 
                setShowOverlay(!showOverlay)
              }} />,
              document.body
              )}

            </ul>


            {/* Overlay style */}
         {showOverlay && (
          <div
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'
            onClick={() => {
              setShowOverlay(false);
              setShowBoardModal(false)
             }}
           />
          )}
          {/* Overlay Ends */}
        </div>
  )
}

export default Sidebar