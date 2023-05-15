import { useMutation, gpl } from '@apollo/client';
import './Modal.css'
import React from 'react'
import { useParams } from 'react-router-dom';

const EditTaskModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [columnId, setColumnId] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setSubtasks(task.subtasks);
      setColumnId(task.columnId);
    } else {
      setTitle('');
      setDescription('');
      setSubtasks([]);
      setColumnId('');
    }
  }, [task]);


  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { title: '' }]);
  };
    
  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] =  {title: `${value}`} ;
    setSubtasks(updatedSubtasks);
    console.log(subtasks)
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
              value={subtask.title}
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
    
    const {id} = useParams();

  const GET_PROJECT = gql`
    query ($id: ID!){
      project(_id: $id) {
       columns {
        _id
        title
      }
    }
  }`;

    const selectOptions = columns.map((column) => (
        <option key={column._id} value={column._id}>
          {column.title}
        </option>
      ));

    const UPDATE_TASK_MUTATION = gql`
    mutation($id: ID!, $title: String!, $columnId: ID!, $subtasks: [SubtaskInput]){
       updateTask(_id: $id, title: $title, columnId: $columnId, subtasks: $subtasks) {
        _id
        title
       }
    }`

    const [createTask, { loading, error }] = useMutation(CREATE_TASK_MUTATION, {
      update: (cache, { data: { createTask } }) => {
        cache.modify({
          id: cache.identify({ __typename: 'Column', _id: columnId }),
          fields: {
            tasks(existingTasks = []) {
              const newTaskRef = cache.writeFragment({
                data: createTask,
                fragment: gql`
                  fragment NewTask on Task {
                    _id
                    title
                  }
                `
              });
              return [...existingTasks, newTaskRef];
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

    createTask({
      variables: {
        title,
        columnId,
        description,
        subtasks
      }
      
    });

    onClose();
  };

  return (
    <div className='modal modalOverlay overflow-y-scroll overflow-x-hidden bg-primary p-6 text-slate-100 scrollbar-hide md:scrollbar-default'>
        <h1 className='py-2.5 text-lg font-bold'>Add new Task</h1>

     <form className="w-full max-w-lg" onSubmit={handleSubmit}>

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
            value={title} 
            onChange={(e) => setTitle(e.target.value)}/>
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
             value={description} 
             onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-6 text-slate-100">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block capitalize tracking-wide text-xs font-bold mb-2" htmlFor="subtasks">
                Subtasks
            </label>
            {renderSubtaskInputs()}
            <button className='rounded-full bg-morado w-96 h-12 text-slate-100 font-semibold'
             onClick={handleAddSubtask}
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
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                >
                 <option value="">Select a column</option>
                 {selectOptions}
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
  )
}

export default EditTaskModal