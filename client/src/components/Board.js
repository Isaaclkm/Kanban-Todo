import React, { useState } from 'react'
import Column from './Column'

const Board = () => {
    const [verdad, setVerdad] = useState(false)
    const data = [
        {   id: '1',
            title: 'Todo'},
            {   id: '2',
            title: 'Doing'},
            {   id: '3',
            title: 'Done'}
    ]
  return (
    <div className='Board flex flex-col grow border-slate-600'>
        <div className='px-7 Top h-24 w-full flex flew-row justify-between items-center bg-primary grow'>
            <h1 className='text-slate-100 text-2xl font-semibold'>Platform Launch</h1>
            <button className='rounded-full bg-morado w-40 h-12 text-slate-100 font-semibold' > + Add new Task</button>
        </div>
        <div className='Column  w-full h-full bg-third flex flex-row flex-1'>
            {verdad ? 'No column' : data.map((title, id) => {
            return <Column data = {title} key= {id}/>
             })}
        
        </div>
    </div>
    
  )
}

export default Board