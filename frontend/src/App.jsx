import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import Register from './components/Register';
import Login from './components/Login';
import Notfound from './components/NotFound';
import Track from './components/Track';
import Diet from './components/Diet';
import { UserContext } from './context/UserContext';
import { useState } from 'react';
import Private from './components/Private';

function App() {
  const [userLogged,setuserLogged]=useState(JSON.parse(localStorage.getItem("nutrify-item")));



  return (
    <>
    <UserContext.Provider value={{userLogged,setuserLogged}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/track' element={<Private Component={Track}/>}/>
        <Route path='/diet' element={<Private Component={Diet}/>}/>
        <Route path='*' element={<Notfound/>}/>

        
        
      </Routes>
      </BrowserRouter>
    
    </UserContext.Provider>
    </>
  )
}

export default App
