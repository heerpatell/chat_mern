import React from 'react'
import styled from 'styled-components'

function Welcome({currentUserName}) {
  return (
    <>
    <Container>
        <h1>Welcome <span>{currentUserName}!</span></h1>
        <h3>Pls select a chat to start!</h3>
    </Container>
    </>
  )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-items:center;
    align-items:center;
    h1,h3{
        text-align:center;
    }
`;

export default Welcome