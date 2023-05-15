import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import TaskModal from './Modals/TaskModal';

const CardItem = ({task}) => {

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); 

  const handleSubmit = () => {
    setShowTaskModal(true);
    setShowOverlay(true);
    console.log('Testing')
  }

  const { title } = task
  return (
    
    <div >
      <div className='card w-64 h-20 bg-primary	p-4 rounded-lg' onClick={handleSubmit}>
        <h1 className='text-slate-100	font-semibold'>{title}</h1>
        <span className='text-gray-400	 font-semibold text-sm'> 0 of 3 subtasks</span>
      </div>

      {showTaskModal && createPortal(
        <TaskModal task={task} onClose={() => {setShowTaskModal(!showTaskModal); setShowOverlay(!showOverlay)}} />,
      document.body
      )}

       {/* Overlay style */}
       {showOverlay && (
          <div
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'
            onClick={() => {
              setShowTaskModal(false);
              setShowOverlay(false);
             }}
           />
          )}
          {/* Overlay Ends */}
    </div>



  )
}

export default CardItem