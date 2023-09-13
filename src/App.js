// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// import NotFound from "./NotFound.js";
// import Root from "./pages/Root";
// import Login from "./pages/Login";
// import Logout from "./pages/Logout";
// import NewPost from "./pages/NewPost";
// import Profile from "./pages/Profile";
// import Register from "./pages/Register";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <NotFound />,
//     children:[
//       {
//         path: "NewPost",
//         element: <NewPost/>,
//       },
//       {
//         path: "Profile",
//         element: <Profile/>,
//       },
//       {
//         path: "Register",
//         element: <Register/>,
//       },
//       {
//         path: "Login",
//         element: <Login/>,
//       },
//       {
//         path: "Logout",
//         element: <Logout/>,
//       },
//     ],
//   }
// ]);

// function App() {
//   return (
//     <div className="App">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Logout, NewPost, Posts, Profile, Register } from './pages'
import { Container } from "@mui/material";
import Nav from './Nav'

function App() {
  const BASE_URL = 'https://strangers-things.herokuapp.com/api/2305-ftb-pt-web-pt'
  const [authToken, setAuthToken] = useState(window.localStorage.getItem('st-token'));
  const [userID, setUserID] = useState(window.localStorage.getItem('st-user-id'));

  return (
    <div>
        <Nav authToken={authToken}/>
        <Container maxWidth="xl">
          <Routes>
            <Route index element={<Posts BASE_URL={BASE_URL} userID={userID} authToken={authToken} />} />
            <Route path="new-post" element={<NewPost authToken={authToken} BASE_URL={BASE_URL}/>} />
            <Route path="login" element={<Login authToken={authToken} setAuthToken={setAuthToken} BASE_URL={BASE_URL} />} />
            <Route path="logout" element={<Logout authToken={authToken} setAuthToken={setAuthToken} setUserID={setUserID} />}/>
            <Route path="profile" element={<Profile authToken={authToken} BASE_URL={BASE_URL} setUserID={setUserID} userID={userID} />} />
            <Route path="register" element={<Register authToken={authToken} setAuthToken={setAuthToken} BASE_URL={BASE_URL} />} />
          </Routes>
        </Container>
    </div>
  );
}

export default App;
