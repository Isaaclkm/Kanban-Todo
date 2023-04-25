import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import Column from './Column'
import Modal from './Modals/Modal';
import NewCol from './Modals/NewCol';
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
    const [verdad, setVerdad] = useState(false)

    

    // const data = [
    //     {   id: '1',
    //         title: 'Todo'},
    //         {   id: '2',
    //         title: 'Doing'},
            
    // ]

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
        <div className='px-7 Top min-h-1/5 max-h-24 w-full flex flew-row justify-between items-center bg-primary grow borderborder-slate-300'>
            <h1 className='text-slate-100 text-2xl font-semibold'>Platform Launch</h1>
            <button className='rounded-full bg-morado w-40 h-12 text-slate-100 font-semibold' onClick={() => {
              setShowModal(true);
              setShowOverlay(true);
            }}> + Add new Task</button>

            {showModal && createPortal(
             <Modal onClose={() => {setShowModal(!showModal); setShowOverlay(!showOverlay)}} columns={columns} />,
            document.body
            )}

        </div>

              {/* Columns Section */}
        <div className='Column  w-full min-h-4/5 bg-third flex flex-row flex-1 overflow-x-scroll overflow-y-auto'>
          
            {/* {verdad ? 'No column' : taskes.map((tasks, id) => {
            return <Column data = {tasks} key= {id} showOverlay={showOverlay}/>
             })} */}
           
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