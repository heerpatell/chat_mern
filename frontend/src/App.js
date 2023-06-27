import {BrowserRouter as Br , Route, Routes} from 'react-router-dom'
import Reg from './pages/Reg'
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
  return (
    <Br>
      <Routes>
        <Route path='/register' element={<Reg />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Chat/>} />
      </Routes>
    </Br>
  );
}

export default App;
