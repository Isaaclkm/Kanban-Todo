import React, { useState } from 'react'
import './Modal.css'
import { useMutation, gql } from '@apollo/client'

const CREATE_COLUMN_MUTATION = gql`
  mutation($title: String!, $projectId: ID!){
  createColumn(title: $title, projectId: $projectId) {
    _id
    title
  }
}`

const NewCol = ({onClose, projectId}) => {
const [title, setTitle] = useState('');

const [createColumn, { data, loading, error }] = useMutation(CREATE_COLUMN_MUTATION);
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');

    createColumn({
      variables: {
        title,
        projectId
      }
    });

    onClose();
  };

  return (
    
    <div className='Colmodal modalOverlay overflow-y-hidden overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default'> 
      <form onSubmit={handleSubmit}>
        <div class="flex flex-wrap -mx-3 mb-6 text-slate-100 ">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
                Title
            </label>
            <input class="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight" id="title" type="text" name="name" value={title} placeholder="" onChange={(e) => setTitle(e.target.value)}/>
            </div>
        </div>
        <button className='rounded-full bg-white w-96 h-12 text-morado font-semibold' >Add new Column</button>
     </form >
    </div>
  )
}

export default NewCol