import { useState } from 'react'
import Login from './Component/Login'
import Register from './Component/Register'
import Dashbord from './Component/Dashbord'
import Navbar from './Component/Navbar'
import GetJob from './Component/GetJob'
import JobCard from './Component/JobCard'
import AboutMe from './Component/AboutMe'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Dashbord></Dashbord>} />
          <Route path='/work' element={<JobCard></JobCard>} />
          <Route path='/add-work' element={<GetJob></GetJob>} />
          <Route path='/about' element={<AboutMe></AboutMe>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/logout' element={<Login></Login>} />
          <Route path='/register' element={<Register></Register>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
