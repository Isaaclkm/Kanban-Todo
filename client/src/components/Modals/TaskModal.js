import React, { useContext, useState } from 'react'
import './Modal.css'
import { gql, useQuery } from '@apollo/client';
import { createPortal } from 'react-dom';
import DeleteTask from './DeleteTask';
import Modal from './Modal';
import ColumnsContext from '../ColumnsContext';


const TaskModal = ({ onClick, task }) => {  
    const columns = useContext(ColumnsContext);

    const [showDeleteTask, setShowDeleteTask] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const [isOpen, setIsOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false);
    
    const toggleDropdown = () =>{
     setIsOpen(!isOpen)
    }

//Apollo client starts     
    const GET_TASK = gql`
        query($id: ID!) {
         task(_id: $id) {
                _id
                title
                description
                column {
                      title
                    }
                subtasks {
                    title
                  }
             }
        }`;

    const taskId = task._id;


    const { loading, error, data } = useQuery(GET_TASK, {
     variables: {id: taskId},
     });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const { title, description, subtasks, column } = data.task
//  Apollo Client ends  

    const handleModalClick = (e) => {
        // Prevent clicks inside the modal from triggering the outer click handler
        e.stopPropagation();
      };

    

  return (
    <div className='taskModal modalOverlay overflow-y-scroll overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default' onClick={onClick}>
      <div className="modalContent" onClick={handleModalClick}>
            
            <div className='flex flex-row w-96 justify-between'>
                <h1 className='py-2.5 text-lg font-bold'>{title}</h1>

                <button className="dropdown-toggle" onClick={toggleDropdown} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='ml-2'>
                    <circle cx="12" cy="4" r="2" fill="#888" />
                    <circle cx="12" cy="12" r="2" fill="#888" />
                    <circle cx="12" cy="20" r="2" fill="#888" />
                  </svg>
              </button>
              {isOpen && (
                   <div className="dropdown-menu absolute bg-morado right-1 w-24 h-24 flex flex-col items-center justify-evenly rounded-lg text-slate-100">
                      <a href="#" onClick={()=> {
                        setOpenEdit(!openEdit);
                        setShowOverlay(!showOverlay)                        
                      }}> 
                      Edit Task
                      </a>
                      <a href="#" onClick={() => {
                         setShowDeleteTask(true);
                         setShowOverlay(true);
                       }}>
                        Delete Task
                      </a>
                  </div>
                   )}
            </div>
            


            <div className="flex flex-wrap mx-3 py-2.5 mb-6 text-slate-100">
                <p>{description}</p>
            </div>

            {/* Subtasks */}
            <div className="flex flex-wrap -mx-3 mb-6 text-slate-100">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <h1 className='capitalize tracking-wide text-xs font-bold mb-2'>Subtasks </h1>

                    {subtasks && subtasks.map((subtask) => (
                    <div className='bg-darker mt-2 w-96 h-14 text-slate-400 flex flex-row items-center'>
                        <input className='mx-2' type="checkbox" name="subtask"></input>
                        <label htmlFor="subtask" key={subtask.title}>{subtask.title}</label>
                    </div>
                  
                    ))}
                </div>
            </div>
            {/* Subtasks */}

        {/* Status Select */}
            <div className="flex flex-wrap -mx-3 mb-2 text-slate-100">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block capitalize tracking-wide text-xs font-bold mb-2" htmlFor="status">
                    Status
                </label>
                <div className="relative w-96">
                    <select class="block appearance-none w-96 bg-primary border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none text-slate-100" 
                    id="status"
                    // value={columnId}
                    // onChange={(e) => setColumnId(e.target.value)}
                    >
                    <option value="">{column.title}</option>
                    {/* {selectOptions} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                
            </div>
        {/* Status Select */}
        </div>

        {/* Delete Modal starts */}
           {showDeleteTask && createPortal(
             <DeleteTask onClose={() => {setShowDeleteTask(!showDeleteTask); setShowOverlay(!showOverlay)}} taskId={taskId}
             />,
            document.body
            )}
         {/* Delete MOdal Ends */}


         {/* Start Edit Modal  */}
         {openEdit && createPortal(
             <Modal onClose={() => {setOpenEdit(!openEdit); setShowOverlay(!showOverlay)}} 
             columns={columns} task={task}
             />,
             document.body
            )}
         {/* End Edit Modal  */}


         {/* Overlay style */}
         {showOverlay && (
          <div
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'
            onClick={() => {
              setShowOverlay(false);
              setShowDeleteTask(false);
             }}
           />
          )}
          {/* Overlay Ends */}
         </div>
  )
}

export default TaskModal