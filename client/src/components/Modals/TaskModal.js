import React from 'react'
import './Modal.css'

const TaskModal = ({ onClick }) => {
    const handleModalClick = (e) => {
        // Prevent clicks inside the modal from triggering the outer click handler
        e.stopPropagation();
      };
  return (
    <div className='modal modalOverlay overflow-y-scroll overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default' onClick={onClick}>
        <div className="modalContent" onClick={handleModalClick}>
        <h1 className='py-2.5 text-lg font-bold'>Add new Task</h1>

        <form className="w-full max-w-lg" >

        <div className="flex flex-wrap -mx-3 mb-6 text-slate-100 ">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block capitalize tracking-wide text-xs font-bold mb-2" htmlFor="title">
                Title
            </label>
            <input className="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight  " 
            id="title" 
            type="text" 
            name="title" 
            placeholder="" 
            // value={title} 
            // onChange={(e) => setTitle(e.target.value)}
            />
            </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-6 text-slate-100">
            <div className="w-full px-3">
            <label className="block capitalize tracking-wide text-xs font-bold mb-2" htmlFor="description">
                Description
            </label>
            <textarea className="w-96 h-24 px-3 py-2 mb-4 leading-5 bg-primary border border-gray focus:border-morado focus:outline-none rounded-lg resize-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300" placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little'
             id="description" 
             type="text" 
             name="description" 
            //  value={description} 
             ></textarea>
            </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-6 text-slate-100">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block capitalize tracking-wide text-xs font-bold mb-2" htmlFor="subtasks">
                Subtasks
            </label>
            {/* <input class="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight  " 
            id="subtask-input" 
            type="text" 
            placeholder=""
            /> */}
            {/* {renderSubtaskInputs()} */}
            <button className='rounded-full bg-morado w-96 h-12 text-slate-100 font-semibold'
            //  onClick={handleAddSubtask}
             type="button"
             > + Add new SubTask</button>
            </div>
        </div>

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
                 <option value="">Select a column</option>
                 {/* {selectOptions} */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            </div>
            
        </div>
        {/* Status Select */}
        <button className='rounded-full bg-white w-96 h-12 text-morado font-semibold' type='submit'>Create new Task</button>

        </form>
        </div>
    </div>
  )
}

export default TaskModal