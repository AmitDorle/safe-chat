import React from 'react'
import axios from 'axios'
import Message from '../Message/Message'
import { useState,useEffect } from 'react'
import './Home.css'

function Home() {
    const [messages, setMessages] = useState([])
    const [currentUser, setcurrentUser] = useState([])
    const [text, setText] = useState("");
    const [toEmail, setToEmail] = useState("");

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user)
        {
            setcurrentUser(user)
        }
        else
        {

        }
        async function fetchData()
        {
            const response = await axios.get('/messages');
            console.log(response.data)
            setMessages(response.data)
        }
        fetchData();
    },[])

    async function sendMessage()
    {
        await axios.post('/send',{
            "to": toEmail,
            "from": currentUser.email,
            "text": text
        })
            window.location.reload();
        setText("")
    }
  return (
    <div>
        <h2>Hello {currentUser.fullName} ✌️</h2>
        <div className='chat-container'>
        {
            messages.map((message)=>{
                const type = currentUser.email===message.from ? 'outgoing' : 'incoming';
                return(
               <Message to={message.to} from={message.from} text={message.text} 
               type={type}
               />
                )
            })
        }
    </div>
    <div>
        <input type="text" placeholder='To Email' className='txt-box' onChange={(e)=>{setToEmail(e.target.value)}} />
        <input type="text" placeholder='Enter Text' className='txt-box' onChange={(e)=>{setText(e.target.value)}} />
        <button onClick={sendMessage} className='Send-Button' >send</button>
    </div>
    </div>
  )
}

export default Home