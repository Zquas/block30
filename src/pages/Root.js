import {useState} from 'react';
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  function logout() {
    localStorage.removeItem('token');
    setToken('');
  }
  return (
    <div>
        <header>
          <nav>
            <Link to="Home">Home</Link>
            <Link to="Posts">Posts</Link>
            {token && <Link to="Profile">Profile</Link>}
            {!token && <Link to="Register">Register</Link>}
            {!token && <Link to="Login">Login</Link>}
            {token && <button onClick = {logout}>Logout</button>}           
          </nav>
        </header>
        <main>
            <Outlet context={[token, setToken]}/>
        </main>
      <footer>Copyright 2023</footer>
    </div>
  );
}