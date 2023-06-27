import React,{useState} from 'react'
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/io'

function ChatInput({handleSendMsg}) {  

const [msg,setMsg] = useState("")

const sendChat = (event) => {
    event.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg)
        setMsg('')
    }
}

return (
    <>

    <ChatInp>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type='text' placeholder='Enter message here' 
            value={msg} 
            onChange={(e) => setMsg(e.target.value)}
            />
            <button className='submit'>
                <IoMdSend/>
            </button>
        </form>
    </ChatInp>
    </>
  )
}

const ChatInp = styled.div`
padding: 0 1rem;
padding-bottom:0.3rem;
align-items:center;

.input-container{
    width:100%;
    height:100%;
    border-radius:2rem;
    display:flex;
    align-content:bottom;
    gap:2rem;
    input{
        width:100%;
        background-color:tran;
        color:black;
        border:none;
        padding-left:1rem;
        font-size:1.3rem;
        &::selection{
            background-color:'#9186f3';
        }
        &:focus{
            outline:none;
        }
    }
    button{
        padding: 0.2rem 0.5rem;
        border-radius:1rem;
        display:flex;
        justify-content:center;
        align-items:center;
        border:none;
        svg{
            cursor:pointer;
            font-size:2rem;
            color:black;
        }
    }
}
`

const Container = styled.div`
 height:80%;
}
`

export default ChatInput