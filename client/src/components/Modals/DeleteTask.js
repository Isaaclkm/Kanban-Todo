import React from 'react'
import './Modal.css'
import { useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';


const DeleteTask = ({onClose, taskId}) => {
    const {id} = useParams();

  const DELETE_TASK = gql`
      mutation($id: ID!){
         deleteTask(_id: $id) {
             title
         }
     }`



  const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK, {
    update: (cache, { data: { deleteTask } }) => {
        cache.modify({
          fields: {
            tasks(existingTasks = [], { readField }) {
              return existingTasks.filter((taskRef) => {
                return deleteTask._id !== readField('_id', taskRef);
              });
            }
          }
        });
      },
  onCompleted: (data) => {
    console.log(data);
  }});

  const handleSubmit = (e) => {

    deleteTask({
      variables:{
        id: taskId
      }
    })
    window.location.href = `http://localhost:3000/project/${id}`;
    onClose();
  }

  return (
    <div className='Colmodal modalOverlay overflow-y-hidden overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default'> 
        <div className  ="flex flex-wrap mx-3 mb-6  ">
            <h1 className='w-full md:w-1/2 mb-6 md:mb-0 text-red-400 font-bold'>
                  Delete this Board?
            </h1>   
            <p className='text-slate-400 mt-6'>Are you sure you want to delete this board, its columns and its tasks? This action cannot be reversed.</p>
        </div>

       <div className='flex flex-row justify-between'> 
            <button className='rounded-full bg-red-400 w-48 h-12 text-slate-100 font-semibold ' onClick={handleSubmit}>Delete</button>
            <button className='rounded-full bg-white w-48 h-12 text-morado font-semibold' onClick={onClose}>Cancel</button>
        </div> 
    </div>
  )
}

export default DeleteTask