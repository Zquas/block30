import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


const NewPost = ({ BASE_URL, authToken }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [delivery, setDelivery] = useState(false)
    const [postSuccess, setPostSuccess] = useState(false)
    const [postFailure, setPostFailure] = useState(false)

    useEffect(() => {
        if (!authToken) {
            navigate('/login')
        }
    }, [])

    const handleChange = (e, setState) => {
        if (e.target.type === 'checkbox') {
            setState(e.target.checked)
        } else {
            setState(e.target.value);
        }
 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(BASE_URL+`posts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        ...(location && { location: location }),
                        ...(delivery && { willDeliver: delivery }),
                    }
                })
            })
            const json = await response.json()
            console.log(json)
            if (json.success) {
                setTitle('')
                setPrice('')
                setDescription('')
                setLocation('')
                setDelivery(false)
                setPostSuccess(true)
            } else if (!json.success) {
                setPostFailure(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
          <div className='content'>
            <h2>Create a New Post</h2>
            {postSuccess ? 
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success" action={<Button color="inherit" size="small" href="/profile" >View Post</Button>}>Thank you for submitting your post — go to your Profile to see all your posts.</Alert>
                </Stack> 
                : null
            }
            {postFailure ? 
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setPostFailure(false);}}><CloseIcon fontSize="inherit" /></IconButton>}>There was a problem with submitting your post. Please make sure all required fields are filled and try again.</Alert>
                </Stack> 
                : null
            }
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                    '& .MuiButton-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
                className='post-form'
                onSubmit={handleSubmit}
                >            
                <TextField
                    required
                    id="title-input"
                    label="Title"
                    className='post-form-elem'
                    value={title}
                    onChange={(e) => handleChange(e, setTitle)}
                />
                <TextField
                    required
                    id="price-input"
                    label="Price"
                    className='post-form-elem'
                    value={price}
                    onChange={(e) => handleChange(e, setPrice)}
                />
                <TextField
                    required
                    id="description-input"
                    label="Description"
                    className='post-form-elem'
                    multiline
                    rows={5}
                    value={description}
                    onChange={(e) => handleChange(e, setDescription)}
                />
                <TextField
                    id="location-input"
                    label="Location"
                    className='post-form-elem'
                    value={location}
                    onChange={(e) => handleChange(e, setLocation)}
                />
                <FormControlLabel
                    label="Will deliver?"
                    control={
                    <Checkbox
                        checked={delivery}
                        onChange={(e) => handleChange(e, setDelivery)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    }
                />
                <Button className='post-form-elem' type='submit' variant="contained" sx={{ bgcolor:'#006d77' }} >Create Post</Button>
            </Box>
          </div>
      </div>
    );
}

export default NewPost;