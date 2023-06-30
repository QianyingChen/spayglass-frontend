import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserInfoQuery, useSignoutMutation } from '../api/userAPi';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';

import './navbar.css';

export function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userProfileMenuOpen, setUserProfileMenuOpen] = useState(false);
  const { data: userInfo } = useUserInfoQuery();
  const [signout] = useSignoutMutation();

  const handleStartSavingsClick = () => {
    if (!userInfo) {
      window.location.replace(`${import.meta.env.VITE_API_URI}/signin`); // Redirect to sign-in page
    }
  };

  // const handleStartSavingsClick = () => {
  //   if (!userInfo) {
  //     window.location.replace('http://localhost:8080/signin'); // Redirect to sign-in page
  //   }
  // };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleUserProfileMenuToggle = () => {
    setUserProfileMenuOpen(!userProfileMenuOpen);
  };

  const handleSignout = () => {
    signout()
      .unwrap()
      .then(() => {
        window.location.href = '/'; // Redirect to homepage
      });
  };

  return (
    <>
    <nav className="navbar">
      <NavLink exexact="true" to="/" className="navbar-logo">
        Spyglass
      </NavLink>
      <div id="navbar" className={mobileMenuOpen ? 'active' : ''}>
        <ul>
          <li>
            <NavLink exact="true" to="/" activeclassname="active">
              Home
            </NavLink>
          </li>
          {userInfo ? (
            <>
              <li>
                <NavLink to="/goals" activeclassname="active">
                  Goals
                </NavLink>
              </li>
              <li>
                <NavLink to="/userinfo" activeclassname="active">
                  Profile
                </NavLink>
              </li>
              {/* <li>
                <a href="#" onClick={handleSignout}>
                  Logout
                </a>
              </li> */}
            </>
          ) : (
            <>
              <li>
                <NavLink to="/signin" activeclassname="active" onClick={handleStartSavingsClick}>
                  Start Your Savings Today
                </NavLink>
              </li>
              <li>
                <a href="http://localhost:8080/signin">Login</a>
              </li>
            </>
          )}
          {/* <li>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <LanguageIcon fontSize="medium" style={{ color: '#fff' }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => i18n.changeLanguage('en')}>English</MenuItem>
              <MenuItem onClick={() => i18n.changeLanguage('cn')}>Chinese</MenuItem>
            </Menu>
          </li> */}
          {userInfo && (
            <li className="user-profile">
              <Avatar alt={userInfo.name} src={userInfo.picture} onClick={handleUserProfileMenuToggle} />
              {userProfileMenuOpen && (
                <ul className="user-profile-menu">
                  <li>
                    <a href="#" onClick={handleSignout}>
                      Logout
                    </a>
                  </li>
                </ul>
              )}
            </li>
          )}
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

