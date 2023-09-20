import React, { useState, useEffect } from 'react'; // npm create vite@latest
import {Route, Routes} from 'react-router-dom'; //npm install react-router-dom
import Login from './components/Login'
import Logout from './components/Logout'
import Registration from './components/Registration';
import './App.css'
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import RenderPosts from './components/RenderPosts';
import RenderPost from './components/RenderPost';
import CreatePost from './components/Create';
import Update from './components/Update';
import SendMessage from './components/SendMessage';
import Profile from './components/Profile';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function userSessionHandler() {
      const result = window.sessionStorage.getItem("token");
      if (result) {
        setToken(result);
      }
    }
    userSessionHandler();

  }, [])

  return (
    <>
      <div>
        <div id="container">
          <Navbar token={token} />
          <div id="main-section">
            <Routes>
              <Route path='/' element={<Homepage token={token} setToken={setToken} />} />
              <Route path='/profile' element={<Profile token={token} setToken={setToken} />} />
              <Route path='/account/login' element={<Login token={token} setToken={setToken} />} />
              <Route path='/account/logout' element={<Logout token={token} setToken={setToken} />} />
              <Route path='/account/register' element={<Registration token={token} setToken={setToken} />} />
              <Route path='/posts' element={<RenderPosts token={token} setToken={setToken} />} />
              <Route path='/posts/:id' element={<RenderPost token={token} setToken={setToken} />} />
              <Route path='/posts/:id/message' element={<SendMessage token={token} setToken={setToken} />} />
              <Route path='/posts/createPost' element={<CreatePost token={token} setToken={setToken} /> } />
              <Route path='/posts/update/:id' element={<Update token={token} setToken={setToken}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App