import React from 'react'
import './Message.css'

function Message(props) {
  return (
    <div className={`message-container-${props.type}`}>
    <div className={`message-content-${props.type}`}>
      {
        props.type === 'incoming' ? 
        <b className='email'>{props.from}</b>
        :
        <b className='email'>{props.to}</b>
      }
         {props.text}
    </div>
    </div>
  )
}

export default Message