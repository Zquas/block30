import * as React from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Inbox = ({ userMessages, userID }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange =
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
        {
            userMessages.filter(({fromUser}) => fromUser._id !== userID).map(({_id, fromUser, post, content}) => {
                return (
                    <Accordion sx={{ mx: 2.5 }} expanded={expanded === `${_id}`} onChange={handleChange(`${_id}`)} key={_id} >
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            From: {fromUser.username}
                        </Typography>
                        {post ? <Typography sx={{ color: 'text.secondary' }}>RE: {post.title}</Typography> : null}
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {content}
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })
        }
    </div>
  );
}

export default Inbox;