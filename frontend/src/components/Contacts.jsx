import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

function Contacts({contacts, currentUser,changeChat}) {
 
  const [currentUserName,setCurrentUserName] = useState(undefined)
  const [currentSelected,setCurrentSelected] = useState(undefined)

  useEffect(()=>{
    if(currentUser){
        setCurrentUserName(currentUser.username)
    }
  },[currentUser])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }

  return (
    <>
    {
        currentUserName && (
            <ContactContainer>
                <div className='brand'>
                    <h2>Hey there! {currentUserName}</h2>
                </div>
                <div className='contacts'>
                {
                    contacts.map((contact,index)=>{
                        return(
                        <>
                        <div 
                        key={index}
                        className='conatct'
                        // className={`conatct ${
                        //     index === currentSelected ? '' : ''
                        // }`}
                        onClick={()=>changeCurrentChat(index,contact)}
                        >
                            <div className='username'>
                                <h2>{contact.username}</h2>
                            </div>
                        </div>
                        </>
                        )
                    })
                }
                </div>

            </ContactContainer>
        )
    }
    </>
  )
}

const ContactContainer = styled.div`
    display:grid;
    grid-template-rows:10% 90% ;
    overflow:hidden;
    background-color:#9AC5F4;
    .brand{
        gap:1rem;
        h2{
            color:black;
            text-align:center;
        }
    }
    .contacts{
        display:flex;
        flex-direction:column;
        min-height:5rem;
        overflow:auto;
        gap: 0.7rem;
        &::-webkit-scrollbar{
            width:0.2rem;
            &-thumb{
                background-color:black;
                width:0.1rem;
                border-radius:1rem;
            }
        }
        .conatct{
            display:flex;
            flex-direction:column;
            justify-items:center;
            align-items:center;
            width: 100%;
            background-color:#19A7CE;
            .username{
                margin:1rem;
                color:black;
                padding:0.7rem;
                cursor:pointer;
                background-color:#9AC5F4;
                width: 100%;
                text-align:center;
            }
        }
    }

`

export default Contacts