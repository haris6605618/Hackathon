import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Students from "./Students"
import Hero from "./Hero"
import Courses from "./Courses"
import Attendance from "./Attendance"
const Dashboard = () => {
  return (
    <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/students' element={<Students />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/attendance' element={<Attendance />} />
    </Routes>
  )
}

export default Dashboard