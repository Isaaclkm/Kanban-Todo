import React from 'react'
import CardItem from './CardItem'

const GET_PROJECT = gql`
  query{
  projects {
    _id
    name
  }
}
`

const  Column = ({data}) => {
  return (
    <div className=''>
       <div className="w-72 h-full bg-third child:ml-4 child:mb-5">
          <div class="Column-Title flex items-center">
             <span class="h-4 w-4 rounded-full bg-blue-500 mr-2"></span>
             <span class="uppercase text-gray-400 tracking-widest">{data.title} </span>
          </div>
                   
          <CardItem/>
          <CardItem/>
          <CardItem/>
          <CardItem/>
          <CardItem/>

      </div>

    </div>
  )
}

export default  Column