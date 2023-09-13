import { useState, useEffect } from "react";
import PostCard from '../PostCard';
import TextField from '@mui/material/TextField';

const Posts = ({ authToken, BASE_URL, userID }) => {

    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')

    const getPosts = async () => {
        try {
            const response = await fetch(BASE_URL+'posts')
            const JSON = await response.json();
            const data = await JSON.data;
            console.log(data.posts)
            setPosts(data.posts)
        } catch (err) {
            console.log('There has been an error in getting new posts.', err)
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
      <div>
        <div className='content'>
            <h2>Posts</h2>
            <div className='post-cards'>
                <TextField fullWidth label="Search" id="search" sx={{ m: 2.5 }} value={search} onChange={handleSearch} />
                {posts
                    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()) || post.author.username.includes(search) || post.description.toLowerCase().includes(search.toLowerCase()) || post.location.toLowerCase().includes(search.toLowerCase()))
                    .map((post) => 
                    <PostCard title={post.title} author={post.author.username} isAuthor={posts.isAuthor} price={post.price} location={post.location} description={post.description} key={post._id} id={post._id} authToken={authToken} BASE_URL={BASE_URL} userID={userID} authorID={post.author._id} />)
                }
            </div>
        </div>
      </div>
    );
  }
  
export default Posts;