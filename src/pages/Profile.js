import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../PostCard";
import Inbox from "../Inbox";
import { useNavigate } from 'react-router-dom';

const Profile = ({ authToken, BASE_URL, setUserID, userID }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [userMessages, setUserMessages] = useState([])

    const getUserData = async () => {
        try {
            const response = await fetch(BASE_URL + `users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
            })
            const JSON = await response.json();
            const data = await JSON.data;
            const posts = await data.posts
            setUserID(data._id)
            window.localStorage.setItem('st-user-id', data._id)
            setUserData(data)
            setUserPosts(posts.filter((post) => post.active))
            setUserMessages(data.messages)
            console.log(userData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserData();
        if (!authToken) {
            navigate('/login')
        }
        console.log(userData.messages)

    }, [])



    return (
      <div>
        <div className='content'>
            <h2>Profile</h2>
            <h3>{authToken ? `Welcome ${userData.username}!` : 'You are not logged in'}</h3>

            {userMessages.length > 0 ? 
                <>
                    <h3>Your Messages</h3>
                    <Inbox userMessages={userMessages} userID={userID} />
                </> 
                : null 
            }

            {userPosts.length > 0 ? 
            <>
                <h3>Your Posts</h3>
                <div className='post-cards'>
                {userPosts.map((post) => <PostCard title={post.title} author={post.author.username} price={post.price} location={post.location} description={post.description} key={post._id} id={post._id} isAuthor='true' authToken={authToken} BASE_URL={BASE_URL} messages={post.messages} getUserData={getUserData} />)}
                </div>
            </> :
            <h4>You don't have any posts yet. Would you like to add a <Link to="/new-post">new post</Link>?</h4>
            }
        </div>
      </div>
    );
  }
  
export default Profile;