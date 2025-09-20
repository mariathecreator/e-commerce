import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Sign from './pages/signup'
import Navbar from './components/navbar'
import Login from './pages/login'
import Admin from './pages/Adminlogin'



function App() {
  return(
    <>
   < Router>
    <Navbar/>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/signup' element={<Sign/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Adminlogin' element={<Admin/>}/>
    </Routes>
   </Router>
    </>
  )
}

export default App
