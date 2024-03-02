import React from 'react'

const Cards = (props) => {
  return (
    <div className='p-5'>
      <div className='w-[350px] p-2 border-2 bg-red-200 rounded-md'>
        <img className='w-[350px] h-[250px]' src={props.data.thumbnail} alt="" />
        <div>
          <p>Id: {props.data.id}</p>
          <p>{props.data.title}</p>
          <p>{props.data.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Cards;
