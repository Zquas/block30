import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';

const MessageButton = ({ author, title, BASE_URL, authToken, postID }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSend = async () => {
    try {
      const response = await fetch(BASE_URL + `posts/`+ postID + `/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          message: {
            content: message
          }
        })
      })
      const json = await response.json()
      if (json.success) {
        setMessage('')
        handleClose()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Button variant="text" endIcon={<SendIcon /> } onClick={handleClickOpen} sx={{ color:'#006d77' }} >
        Send Message
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send a Message to {author}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Interested in or have questions about this listing? Send a message to the {author} about their post: "{title}".
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            rows={5}
            margin="dense"
            id="message"
            label="Type your message..."
            type="text"
            fullWidth
            variant="outlined"
            value={message}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MessageButton;