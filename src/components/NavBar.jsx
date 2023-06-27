import { useState, useEffect  } from 'react';
import { NavLink } from 'react-router-dom';
import { useSigninQuery, useUserInfoQuery, useSignoutMutation } from '../api/userAPi';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Menu, MenuItem } from '@mui/material';
import './navbar.css';

export function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  const { data: userInfo } = useUserInfoQuery();
  const { isLoading: signinLoading, refetch: refetchUserInfo } = useSigninQuery();
  const [signout, { isLoading: signoutLoading }] = useSignoutMutation({
    onSettled: () => {
      refetchUserInfo(); // Refresh user info after signout
    },
  });

  console.log('userInfo:', userInfo); 
  
  const handleStartSavingsClick = () => {
    if (!userInfo) {
      window.location.replace('http://localhost:8080/signin'); // Redirect to sign-in page
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignout = () => {
    signout();
  };

  return (
    <>
      <nav>
        <NavLink exact="true" to="/" className="navbar-logo">
          Spyglass
        </NavLink>
        <div id="navbar" className={mobileMenuOpen ? 'active' : ''}>
          <ul>
            <li>
              <NavLink to="/" end activeclassname="active">
                        Home
              </NavLink>
            </li>
            <li>
              {userInfo ? (
                <NavLink to="/goals" activeclassname="active">
                           Goals
                </NavLink>
                           ) : (
                <NavLink to="/signin" activeclassname="active" onClick={handleStartSavingsClick}>
                          Start Your Savings Today
                </NavLink>
                          )}
                </li>

              <li>
              {/* {userInfo ? (
                <a href="#" onClick={handleSignout}>
                  Logout
                </a>
              ) : (
                <a href="http://localhost:8080/signin">Login</a>
              )} */}
                <a href={userInfo ? '#' : 'http://localhost:8080/signin'}>
                      {userInfo ? 'Logout' : 'Login'}
                </a>
              </li>

            <li>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <LanguageIcon fontSize="medium" style={{ color: '#fff' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => i18n.changeLanguage('en')}>English</MenuItem>
                <MenuItem onClick={() => i18n.changeLanguage('cn')}>Chinese</MenuItem>
              </Menu>
            </li>
          </ul>
        </div>

        <div id="mobile">
          {mobileMenuOpen ? (
            <CloseIcon style={{ color: '#fff' }} onClick={handleMobileMenuToggle} />
          ) : (
            <MenuIcon style={{ color: '#fff' }} onClick={handleMobileMenuToggle} />
          )}
        </div>
      </nav>
    </>
  );
} 


