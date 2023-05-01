import React from 'react'
import TopBar from './TopBar'

const DefBoard = () => {
  return (
  <div className='Board flex flex-col flex-shrink border-slate-600 w-4/5 min-h-screen'>
        <TopBar/>
        <div className='Column  w-full min-h-4/5 bg-third flex flex-row flex-1 overflow-x-scroll overflow-y-auto'> 
             <h1 className='text-purple-400 m-auto p-auto'>Please Select a Board</h1>
        </div>
 </div>
 )
}

export default DefBoard