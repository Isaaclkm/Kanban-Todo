import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import Column from './Column'
import Modal from './Modals/Modal';
import NewCol from './Modals/NewCol';
import TopBar from './TopBar';
import { useQuery, gql } from "@apollo/client";

const GET_COLUMN = gql`
    query{
  columns {
    _id
    title
    tasks {
      _id
      title
    }
  }
}`



const Board = () => {
  const bg = {
    overlay: {
      backgroundColor: "#FFFF00"
    }
  }
    const [showModal, setShowModal] = useState(false);
    const [showColModal, setShowColModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);


  
     // Apollo client starts
  const { loading, error, data } = useQuery(GET_COLUMN);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const { columns } = data




// Apollo client Ends
  return (
    <div className='Board flex flex-col flex-shrink border-slate-600 w-4/5 min-h-screen'>
        <TopBar columns = {columns}/>


              {/* Columns Section */}
        <div className='Column  w-full min-h-4/5 bg-third flex flex-row flex-1 overflow-x-scroll overflow-y-auto'>
          
           {columns.map(column => (
           <Column key={column._id} column={column} />
           ))}

             <div className="Button w-72 h-full bg-third child:ml-4 child:mb-5 flex flex-col justify-center content-center">
                
              <button className='rounded-full bg-third w-64 h-12 text-morado font-semibold'  onClick={() => {
              setShowColModal(true);
              setShowOverlay(true);
              }}>+New Column</button>

              {showColModal && createPortal(
              <NewCol onClose={() => {setShowColModal(!showColModal); setShowOverlay(!showOverlay)}} />,
              document.body
              )}

             </div>
        </div>
         {/* Column Ends */}

        {/* Overlay style */}
         {showOverlay && (
          <div
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'
            onClick={() => {
              setShowModal(false);
              setShowOverlay(false);
              setShowColModal(false)
             }}
           />
          )}
          {/* Overlay Ends */}
    </div>
    
  )
}

export default Board