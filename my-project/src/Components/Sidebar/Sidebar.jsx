import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <div className='logo'>
        <h1>Kanpan</h1>
      </div>
      <div className='Boards'>
        <ul>
          <li>New Board</li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar