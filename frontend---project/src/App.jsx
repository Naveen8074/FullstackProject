import React from "react";
import {Route,Routes} from "react-router-dom"
import Home from './pages/Home';

import './App.css'

const App = () => {
  return (
    <div className="main-bg">
      <h1 className="books-heading">Books Reviews Details</h1>
    <div>
      <Home />
    </div>
    </div>
  )
}

export default App
