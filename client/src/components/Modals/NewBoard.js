import React, { useEffect, useState } from 'react'
import './Modal.css'
import { useMutation, gql } from '@apollo/client';

const CREATE_PROJECT_MUTATION = gql`
  mutation createProject($name: String!, $description: String!) {
    createProject(name: $name, description: $description) {
      name
    }
  }
`;

const UPDATE_PROJECT_MUTATION = gql`
  mutation($projectId: ID!, $name: String!){
    updateProject(_id: $projectId, name: $name) {
      _id
      name
    }
  }
`;

const NewBoard = ({ onClose, GET_PROJECTS, refetchProjects, project}) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [project]);



  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT_MUTATION,{
      refetchQueries: [{ query: GET_PROJECTS }],
      onCompleted: (data) => {
          console.log(data);
          refetchProjects();
       }
  });

  const [updateProject, {updateLoading, updateError }] = useMutation(UPDATE_PROJECT_MUTATION,{
    refetchQueries: [{ query: GET_PROJECTS }],
    onCompleted: (data) => {
        console.log(data);
     }  
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const name = formData.get('name');
    // const description = formData.get('description');
    if(project && project._id) {
      updateProject({
        variables: {
          projectId: project._id,
          name,
          description
        }
      })
    }else{
      createProject({
        variables: {
          name,
          description
        }
      });

    }
    
    onClose();
  };

  return (
    <div className='Bormodal modalOverlay overflow-y-hidden overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default'>
      <form onSubmit={handleSubmit}>


        <div className="flex flex-wrap -mx-3 mb-6 text-slate-100 ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input className="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight" 
            id="name" 
            type="text" 
            name="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} />
          </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-6 text-slate-100 ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea className="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight" 
            id="description" 
            name="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>


        <button className='rounded-full bg-white w-96 h-12 text-morado font-semibold'>Add new Board</button>

      </form>
    </div>
  );
};

export default NewBoard;