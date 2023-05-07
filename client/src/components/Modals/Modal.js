import React, { useState } from 'react'
import './Modal.css'

const Modal = ({onClose, columns}) => {
    const [subtasks, setSubtasks] = useState([]);

    const handleAddSubtask = () => {
        setSubtasks([...subtasks, '']);
      };
    
      const handleSubtaskChange = (index, value) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index] = value;
        setSubtasks(updatedSubtasks);
      };
    
      const handleDeleteSubtask = (index) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks.splice(index, 1);
        setSubtasks(updatedSubtasks);
      };
    
      const renderSubtaskInputs = () => {
        return subtasks.map((subtask, index) => (
          <div key={index} className="flex items-center w-96 text-slate-100 mb-2">
            <input
              className="mb-1 w-10/12 appearance-none block bg-primary border border-gray focus:border-morado focus:outline-none rounded py-2 px-3 leading-tight"
              type="text"
              placeholder={`Subtask ${index + 1}`}
              value={subtask}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
            />
            <button
              className="text-gray-500 font-bold w-2/12 self-center"
              type="button"
              onClick={() => handleDeleteSubtask(index)}
            >
              X
            </button>
          </div>
        ));
      };
    

    const selectOptions = columns.map((column) => (
        <option key={column._id} value={column._id}>
          {column.title}
        </option>
      ));

  return (
    <div className='modal modalOverlay overflow-y-scroll overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default'>
        <h1 className='py-2.5 text-lg font-bold'>Add new Task</h1>

     <form class="w-full max-w-lg">

        <div class="flex flex-wrap -mx-3 mb-6 text-slate-100 ">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-first-name">
                Title
            </label>
            <input class="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight  " id="grid-first-name" type="text" placeholder=""/>
            </div>
        </div>


        <div class="flex flex-wrap -mx-3 mb-6 text-slate-100">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-password">
                Description
            </label>
            <textarea className="w-96 h-24 px-3 py-2 mb-4 leading-5 bg-primary border border-gray focus:border-morado focus:outline-none rounded-lg resize-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300" placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little'></textarea>
            </div>
        </div>


        <div class="flex flex-wrap -mx-3 mb-6 text-slate-100">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-first-name">
                Subtasks
            </label>
            {/* <input class="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight  " 
            id="subtask-input" 
            type="text" 
            placeholder=""
            /> */}
            {renderSubtaskInputs()}
            <button className='rounded-full bg-morado w-96 h-12 text-slate-100 font-semibold'
             onClick={handleAddSubtask}
             type="button"
             > + Add new SubTask</button>
            </div>
        </div>


        <div class="flex flex-wrap -mx-3 mb-2 text-slate-100">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-state">
                State
            </label>
            <div class="relative w-96">
                <select class="block appearance-none w-96 bg-primary border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none text-slate-100" id="grid-state">
                {/* <option>Todo</option>
                <option>Doing</option>
                <option>Done</option> */}
                 {selectOptions}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            </div>
            
        </div>
        <button className='rounded-full bg-white w-96 h-12 text-morado font-semibold' onClick={onClose}>Create new Task</button>

        </form>

    </div>
  )
}

export default Modal