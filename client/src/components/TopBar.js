import React, { useState } from 'react'
import Modal from './Modals/Modal';
import { createPortal } from 'react-dom';
import DeleteBoard from './Modals/DeleteBoard';
import NewBoard from './Modals/NewBoard';




const TopBar = ({columns}) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteBoard, setDeleteBoard] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const editBoard = () => {
      // Code to handle the "Edit Board" option
      console.log("Edit Board option clicked");
    };
  
  

  return (
    <div className='px-7 Top min-h-1/5 max-h-24 w-full flex flew-row justify-between items-center bg-primary grow border-y	border-slate-30'>
            <h1 className='text-slate-100 text-2xl font-semibold'>Platform Launch</h1>

            <div className='flex flew-row items-center '>
            <button className='rounded-full bg-morado w-40 h-12 text-slate-100 font-semibold' onClick={() => {
              setShowModal(true);
              setShowOverlay(true);
            }}> + Add new Task
            
            </button>

              <button className="dropdown-toggle" onClick={toggleDropdown} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='ml-2'>
                    <circle cx="12" cy="4" r="2" fill="#888" />
                    <circle cx="12" cy="12" r="2" fill="#888" />
                    <circle cx="12" cy="20" r="2" fill="#888" />
                  </svg>
                  {isOpen && (
                   <div className="dropdown-menu absolute bg-morado right-1 w-24 h-24 flex flex-col items-center justify-evenly rounded-lg text-slate-100">
                      <a href="#" onClick={editBoard}> 
                      Edit Board
                      </a>
                      <a href="#" onClick={() => {
                         setDeleteBoard(true);
                         setShowOverlay(true);
                       }}>
                        Delete Board
                      </a>
                  </div>
                   )}
              </button>
            </div>
          
            {/* New Board begins */}
            {showModal && createPortal(
             <Modal onClose={() => {setShowModal(!showModal); setShowOverlay(!showOverlay)}} columns={columns} />,
            document.body
            )}
            {/* New Board Modal ends */}




            {/* Edit Modal begins */}
            {openEdit && createPortal(
             <NewBoard onClose={() => {setOpenEdit(!openEdit); setShowOverlay(!showOverlay)}} 
             project={project}
             />,
             document.body
            )}
            {/* Edit Modal ends */}



            {/* Delete Modal starts */}
            {showDeleteBoard && createPortal(
             <DeleteBoard onClose={() => {setDeleteBoard(!showDeleteBoard); setShowOverlay(!showOverlay)}} columns={columns} />,
            document.body
            )}
            {/* Delete MOdal Ends */}
            

            {/* Overlay style */}
            {showOverlay && (
              <div
                className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'
                onClick={() => {
                setShowModal(false);
                setShowOverlay(false);
                setDeleteBoard(false);
              }}
            />
            )}
            {/* Overlay Ends */}
   </div>
  )
}

export default TopBar