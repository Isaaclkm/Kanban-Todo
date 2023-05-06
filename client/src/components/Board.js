import React, { useEffect, useState} from 'react'
import { createPortal } from 'react-dom';
import Column from './Column'
import NewCol from './Modals/NewCol';
import TopBar from './TopBar';
import { useQuery, gql } from "@apollo/client";
import { useParams } from 'react-router-dom';


const GET_PROJECT = gql`
  query($id: ID!){
    project(_id: $id) {
     _id
     name
    columns {
        _id
        title
        tasks {
          _id
          title
        }
      }
    }
  }
`


const Board = (props) => {

  const bg = {
    overlay: {
      backgroundColor: "#FFFF00"
    }
  }

    const [showModal, setShowModal] = useState(false);
    const [showColModal, setShowColModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const { id } = useParams();
    const { selectedProject} = props;
    
    const { loading, error, data, refetch } = useQuery(GET_PROJECT, {
      variables: {id: selectedProject},
    });
    console.log(id);

    useEffect(() => {
      refetch({id});
    }, [id, refetch]);

      
    if (loading) return ( 
      <div className='Board flex flex-col flex-shrink border-slate-600 w-4/5 min-h-screen'>
        <TopBar/>
        <div className='Column  w-full min-h-4/5 bg-third flex flex-row flex-1 overflow-x-scroll overflow-y-auto'></div>
      </div>
    );
    if (error) return <p>Error :</p>;
  
    const { _id, name, columns } = data.project;
  



// Apollo client Ends
  return (
  <div className='Board flex flex-col flex-shrink border-slate-600 w-4/5 min-h-screen'>
       {selectedProject
        ?<TopBar columns = {columns}/>
        :<TopBar/>
      }


              {/* Columns Section*/}
        <div className='Column  w-full min-h-4/5 bg-third flex flex-row flex-1 overflow-x-scroll overflow-y-auto'>
          
          
              {selectedProject ? (
              <>
              {columns.map(column => (
                 <Column key={column._id} column={column} />
                 ))}

            <div className="Button w-72 h-full bg-third child:ml-4 child:mb-5 flex flex-col justify-center content-center">
             <button
                className="rounded-full bg-third w-64 h-12 text-morado font-semibold"
                onClick={() => {
                   setShowColModal(true);
                   setShowOverlay(true);
                  }}
                >
                +New Column
              </button>

            {showColModal &&
              createPortal(
                <NewCol
                  onClose={() => {
                    setShowColModal(!showColModal);
                    setShowOverlay(!showOverlay);
                  }} GET_PROJECT={GET_PROJECT}
                />,
                document.body
                )}
            </div>
           </>
         ) : (
           <div>
              <p>No board yet</p>
           </div>
         )}

      </div>
  
         {/* Column Ends */}

        {/* Overlay style */}
         {showOverlay && (
          <div
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10'
            onClick={() => {
              setShowModal(false);
              setShowOverlay(false);
              setShowColModal(false)
             }}
           />
          )}
          {/* Overlay Ends */}
    
           
           </div> 
          
  )
}

export default Board