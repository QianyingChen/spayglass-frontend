import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Menu, MenuItem } from '@mui/material';
import './navbar.css';

export function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav>
        {/* <h1>Spyglass</h1> */}
        <NavLink exact to="/" className="navbar-logo">
          Spyglass
        </NavLink>
        <div id="navbar" className={mobileMenuOpen ? 'active' : ''}>
          <ul>
            <li>
             <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <a href='index.html'>Star your saving today</a>
            </li>
            <li>
              <a href='index.html'>Login</a>
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


