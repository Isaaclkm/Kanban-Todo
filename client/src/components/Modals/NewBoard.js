import React, { useState } from 'react'
import './Modal.css'
import { useMutation, gql } from '@apollo/client';

const NewBoard = ({onClose}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const CREATE_PROJECT_MUTATION = gql`
  mutation {
    createProject(name: $name, description: $description) {
      _id
      name
    }
  }
`;
const [createProject, { loading, error }] = useMutation(CREATE_PROJECT_MUTATION);


const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = formData.get('name');
  const description = formData.get('description');

  createProject({
    variables: {
      name,
      description
    }
  });

  onClose();
};

  return (
    <div className='Colmodal modalOverlay overflow-y-hidden overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default'> 

        <div class="flex flex-wrap -mx-3 mb-6 text-slate-100 ">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-first-name">
               Name
            </label>
            <input class="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight  " id="grid-first-name" type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e, name, description)}>
          <button className='rounded-full bg-white w-96 h-12 text-morado font-semibold' onClick={onClose}>Add new Board</button>
        </form>
    </div>
  )
}

export default NewBoard