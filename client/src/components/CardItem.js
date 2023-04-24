import React from 'react'

const CardItem = ({task}) => {

  const { title } = task
  return (
    <div>
      <div className='card w-64 h-20 bg-primary	p-4 rounded-lg'>
        <h1 className='text-slate-100	font-semibold'>{title}</h1>
        <span className='text-gray-400	 font-semibold text-sm'> 0 of 3 subtasks</span>
      </div>
    </div>
  )
}

export default CardItem