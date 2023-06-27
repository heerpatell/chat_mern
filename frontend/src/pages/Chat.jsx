import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {allUsersRoute,host} from '../utils/Api_routes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'

function Chat() {

  const socket = useRef()
  
  const navigate = useNavigate();
  const [contacts,setContacts] = useState([])
  const [currentUser,setcurrentUser] = useState(undefined)
  const [currentChat,setcurrentChat] = useState(undefined)
  const [isLoaded,setIsLoaded] = useState(false)


  const checkUserExist = async () => {
    if(!localStorage.getItem('chat-app-user')) 
      navigate('/login')
    else {
      setcurrentUser(await JSON.parse(localStorage.getItem('chat-app-user'))) //JSON to JS object
      setIsLoaded(true)
    }
  }
  useEffect(()=>{
    checkUserExist();
  },[])

  const apiCall = async () => {
    if(currentUser){
      const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
      // console.log('apicall ',data.data)
      // console.log('d ',data)
      setContacts(data.data)
    }
  }

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user',currentUser._id)
    }
  },[currentUser])

  useEffect(()=>{
    apiCall();
    console.log(contacts)
    console.log(currentChat)
    console.log(currentUser)
  },[currentUser])

  const handleChatChange = (chat) => {
    console.log('chat',chat)
    setcurrentChat(chat)
  }

  const handleClick = () => {
    localStorage.clear();
    navigate('/login')
  }
  
  return (
  <>
  <Container>
  <div className='logout' onClick={handleClick}>Logout</div>
  <div className='chat-body'>
    <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
    {
      (isLoaded && currentChat === undefined) ? 
      <Welcome currentUserName={currentUser.username}/>:
      // console.log('2')
      <ChatContainer currentChatUserName={currentChat.username} currentUserId={currentUser._id} 
      currentChat={currentChat} socket={socket}/>
    }
  </div>
  </Container>
  </>  
  )
}

const Container = styled.div`
  height:100vh;
  width:100vw;
  background-color: #2A2F4F;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  color: white;
  gap: 1rem;

  .logout{
    cursor:pointer;
  }
  .chat-body{
      height: 80vh;
      width: 75vw;
      background-color: #2D2F40;
      display: grid;
      grid-template-columns: 25% 75%; //left-side (25), rest for right-side
      @media screen and (min-width:720px) and (max-width:1080px){
        grid-template-columns: 35% 65%;
      }

  }
`
export default Chat