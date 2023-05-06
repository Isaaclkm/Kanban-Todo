import React, { useState } from 'react'
import './Modal.css'
import { useMutation, gql } from '@apollo/client'
import { useParams } from 'react-router-dom';



const NewCol = ({onClose, GET_PROJECT}) => {
const [title, setTitle] = useState('');
const {id} = useParams()
// const [projectId, setProjectId] = useState(id)

const CREATE_COLUMN_MUTATION = gql`
  mutation($title: String!, $projectId: ID!) {
    createColumn(title: $title, projectId: $projectId) {
      _id
      title
    }
  }
`;

const [createColumn, { loading, error }] = useMutation(CREATE_COLUMN_MUTATION,{
  update: (cache, { data: { createColumn } }) => {
    cache.modify({
      id: cache.identify({ __typename: 'Project', _id: id }),
      fields: {
        columns(existingColumns = []) {
          const newColumnRef = cache.writeFragment({
            data: createColumn,
            fragment: gql`
              fragment NewColumn on Column {
                _id
                title
              }
            `
          });
          return [...existingColumns, newColumnRef];
        }
      }
    });
  },
  onCompleted: (data) => {
    console.log(data);
  }
});
 

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const projectId = id

    createColumn({
      variables: {
        title,
        projectId
      }
    });
    console.log(projectId);

    onClose();
  };

  return (
    
    <div className='Colmodal modalOverlay overflow-y-hidden overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default'> 
      <form onSubmit={handleSubmit}>
        <div className  ="flex flex-wrap -mx-3 mb-6 text-slate-100 ">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
                  Title
              </label>
              <input className="appearance-none block w-96 bg-primary border border-gray focus:border-morado focus:outline-none rounded py-3 px-4 mb-3 leading-tight" id="title" type="text" name="title" value={title} placeholder = "" onChange={(e) => setTitle(e.target.value)}/>
            </div>
        </div>
        <button className='rounded-full bg-white w-96 h-12 text-morado font-semibold' >Add new Column</button>
     </form >
    </div>
  )
}

export default NewCol