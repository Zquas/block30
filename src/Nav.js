import { Link } from "react-router-dom";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LoyaltyIcon from '@mui/icons-material/Loyalty';


const Nav = ({ authToken }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" sx={{ bgcolor: '#006d77' }}>
      <Container maxWidth="xl">
        <Toolbar >
          <LoyaltyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Grape Nuts',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Stranger's Things
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={Link} to='/' onClick={() => {
                handleCloseNavMenu()
              }}>
                <Typography textAlign="center">Posts</Typography>
              </MenuItem>
              {!authToken ? null : 
                <MenuItem component={Link} to='/profile' onClick={() => {
                  handleCloseNavMenu()
                }}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              }
              {!authToken ? null : 
                <MenuItem component={Link} to='/new-post' onClick={() => {
                  handleCloseNavMenu()
                }}>
                  <Typography textAlign="center">New Post</Typography>
                </MenuItem>
              }
              {authToken ? null : 
                <MenuItem component={Link} to='/login' onClick={() => {
                  handleCloseNavMenu()
                }}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              }
              {authToken ? null : 
                <MenuItem component={Link} to='/register' onClick={() => {
                  handleCloseNavMenu()
                }}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
              }
              {!authToken ? null : 
                <MenuItem component={Link} to='/logout' onClick={() => {
                  handleCloseNavMenu()
                }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              }
            </Menu>
          </Box>
          <LoyaltyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Grape Nuts',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Stranger's Things
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              href='/'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Posts
            </Button>
            {!authToken ? null : 
              <Button
                href='/profile'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Profile
              </Button> 
            }
            { !authToken ? null : 
              <Button
                href='/new-post'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                New Post
              </Button> 
            }
            {authToken ? null : 
              <Button
                href='/login'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            }
            {authToken ? null : 
              <Button
                href='/register'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Register
              </Button> 
            }
            { !authToken ? null : 
              <Button
                href='/logout'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Logout
              </Button> 
            }            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;