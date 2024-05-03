import React from "react"
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/main.css"

import NavBar from "./components/navbar";
import Signup from "./components/signup";
import Login from "./components/login";
import PostPage from "./components/posts";
import Home from "./components/home";

const App = () => {

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

