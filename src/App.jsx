import { useState,useEffect } from 'react'
import './App.css'
import { Navigate,Route, Routes } from "react-router-dom";
import Mainpage from './Components/Mainpage';
import Viewpage from './Components/Viewpage';



function App() {


  return (
    <Routes>
    {/* Route for the Login page */}
    <Route path="/" element={ <Mainpage />}></Route>
    <Route path="/viewpage/:id" element={<Viewpage />} />
    </Routes>
  )
}

export default App
