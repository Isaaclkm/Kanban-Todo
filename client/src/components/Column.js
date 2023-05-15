import React, { useState } from 'react'
import CardItem from './CardItem'




const  Column = ({ column }) => {
  const { title, tasks } = column;

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); 

  const handleCardItemClick = (task) => {
    setSelectedTask(task);
  };


  return (
    <div className=''>
       <div className="w-72 h-full bg-third child:ml-4 child:mb-5">
          <div class="Column-Title flex items-center">
             <span class="h-4 w-4 rounded-full bg-blue-500 mr-2"></span>
             <span class="uppercase text-gray-400 tracking-widest">{title} </span>
          </div>

         {tasks.map(task => (
          
          <CardItem key={task._id} task={task} onClick={handleCardItemClick}/>
    
            ))}

       



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

    </div>
  )
}

export default  Column