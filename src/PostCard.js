import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageButton from './MessageButton';
import MessageInboxButton from './MessageInboxButton';


const PostCard = ({ BASE_URL, title, author, price, location, description, isAuthor, id, authToken, getUserData, userID, authorID, messages }) => {

    const deletePost = async (e, id, authToken, getUserData) => {
      console.log(e.target)
      console.log(id)
      try {
        const response = await fetch(BASE_URL + `posts/` + id, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        const json = await response.json()
        const data = await json.data
        console.log(json)
        getUserData();
      } catch (err) {
        console.log(err)
      }
    }

    return (
        <>
          <Card sx={{ minWidth: 275, width: 300, margin: '20px', bgcolor: '#e9f2ec' }}>
            <div className='card-contents'>
              <div className='card-details'>
                <CardContent>
                  <div className='card-header'>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {location === `[On Request]` ? `Location on request` : location }
                    </Typography>
                    {isAuthor ? <DeleteIcon fontSize="small" id={id} onClick={(e) => deletePost(e, id, authToken, getUserData)} /> : null}
                  </div>
                  <Typography variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {author}
                  </Typography>
                  <Typography variant="body2">
                    {description}
                  </Typography>
                  <Typography sx={{ mt: 1.5 }} color="text.primary">
                    Price: {price}
                  </Typography>
                </CardContent>
              </div>
              <div className='card-buttons'>
                <CardActions >
                  { userID===authorID || !userID ? null : <MessageButton author={author} title={title} authToken={authToken} postID={id} BASE_URL={BASE_URL}  />}
                  { messages && messages.length > 0 ? <MessageInboxButton title={title} messages={messages} /> : null }
                </CardActions>
              </div>
            </div>
          </Card>
        </>
    );   
}

export default PostCard;