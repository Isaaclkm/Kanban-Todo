import React, { useState } from 'react'
import '../index.css'
import Board from '../assets/icon-board.svg'
import Logo from '../assets/logo-light.svg'
import { createPortal } from 'react-dom';
import { useQuery, gql } from "@apollo/client";
import NewBoard from './Modals/NewBoard';


const GET_PROJECT = gql`
  query{
  projects {
    _id
    name
  }
}
`;

const Sidebar = () => {
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
// Apollo client starts
  const { loading, error, data } = useQuery(GET_PROJECT);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  const lol = data.projects.length;

 const names = data.projects.map(project => project.name);

 const boards = names.map((item) =>
  <li className="flex flex-start items-center flex-row
  py-3	text-gray-400 gap-3.5 h-7 ">
      <img src={Board} alt="board"></img>
      <p>{item}</p> 
  </li>
)
// Apollo client Ends
  
  return (
    <div className=" inset-y-0 left-0 bg-primary w-72 flex flex-col flex-start">

            <div className="image-container h-24  p-7">
              <img src={Logo} alt="logo" className="flex items-center justify-center h-6 w-36"></img>
            </div>
        
            <h1 className='uppercase text-gray-400 ml-7 my-7 tracking-widest'>all boards ({lol})</h1>
            <ul className="flex flex-col flex-start ml-7 text-base h-full space-y-6">
                {boards}
                
                {/* <li className="flex flex-start items-center flex-row
                py-3	text-gray-400 gap-3.5 h-7">
                  <img src={Board} alt="board"></img>
                    <p>Marketing Plan</p>
                </li>
                <li className="flex flex-start items-center flex-row
                py-3	text-gray-400 gap-3.5 h-7">
                  <img src={Board} alt="board"></img>
                    <p>Road Map</p>
                </li> */}
              <button onClick={() => {
              setShowBoardModal(true);
              setShowOverlay(true);
              }}>
                <li className="flex flex-start items-center flex-row
                py-3	text-purple-400 gap-3.5 h-7">
                  <img src={Board} alt="board" className='color-purple'></img>
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