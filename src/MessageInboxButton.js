import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Inbox from './Inbox';

const MessageInboxButton = ({ messages, title }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
      console.log(messages)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Badge badgeContent={`${messages.length}`} color="primary" >
            <MailIcon onClick={(e) => {handleClickOpen()}} />
        </Badge>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Messages About Your Post: "{title}"</DialogTitle>
            <DialogContent>
                <Inbox userMessages={messages}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default MessageInboxButton;