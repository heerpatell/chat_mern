import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import axios from 'axios'
import {getMsgRoute, sendMsgRoute} from '../utils/Api_routes'
import {v4 as uuidv4} from 'uuid'

function ChatContainer({currentChatUserName , currentUserId, currentChat, socket}) {

    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState([])

    const scrollRef = useRef()
    const handleSendMsg = async (msg) => {
        // alert(msg)
        // {console.log(currentUserId,currentChat._id,msg)}
        let currentChatId = currentChat._id;
        console.log(sendMsgRoute)
        await axios.post(sendMsgRoute,{
            currentUserId,currentChatId,msg
        })
        socket.current.emit('send-msg',{
            to: currentChatId,
            from: currentUserId,
            messages:msg, 
        })
        const msgs = [...messages]
        msgs.push({fromSelf:true,messages:msg})
        setMessages(msgs)
    }   

    useEffect(()=>{
        if(socket.current){
            socket.current.on('msg-recieve',(msg)=>{
                setArrivalMessage({
                    from: false,
                    message: msg
                })
            })
        }
    },[])
    
    useEffect(()=>{
        arrivalMessage &&  setMessages((prev)=>[
            ...prev, arrivalMessage
        ])
    },[arrivalMessage])

    useEffect(()=>{
        scrollRef.current.scrollIntoView({behaviour: "smooth"}) 
        // scrollRef.current?.scrollIntoView({behaviour: "smooth"}) 
    },[messages])   

    const fun = async () => {
        // console.log(getMsgRoute)
        let currentChatId = currentChat._id;

        if(currentChat){
            const resp = await axios.post(getMsgRoute,{
                currentUserId,currentChatId
            })
            setMessages(resp.data)
        }
        // console.log('all_msgs ',resp)
    }
    useEffect(()=>{
        fun();
    },[])

return (
    <>
    <Container>
    <div className="chat-header">
        <div className='user-details'>
            <div className='username'>
                <h3>{currentChatUserName}</h3>
            </div>
        </div>
    </div>
    <div className="chat-messgaes">
        {
            messages.map((m)=>{
                return(
                    <div ref={scrollRef} key={uuidv4()}>
                        <div className={`m ${m.fromSelf ? 'sent' : 'received'}`}>
                            <div className="content">
                                <p>{m.message}</p>
                            </div>
                        </div>
                    </div>    
                )
            })
        }
    </div>

    <ChatInput handleSendMsg = {handleSendMsg} />
    </Container>
    </>
  )
}

const Container = styled.div`
padding-top:1rem;
.chat-header{
    display:flex;
    align-items:center;
    padding: 0 2rem;    
}
.user-details{
    display:flex;
    align-items:center;
    gap:1rem;
    .username{
        h3{
            font-size:1.5rem;
        }
    }
}
.chat-messgaes{
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap: 1rem;
    overflow: auto;
    .m{
        display: flex;
        align-items: center;
        .content{
            max-width:40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: black; 
        }
    }
    .sent{
        justify-content: flex-end;
        .content{
            background-color: #B0DAFF;
        }
    }
    .received{
        justify-content: flex-start;
        .content{
            background-color: greeen;
        }
    }
}
` 

export default ChatContainer