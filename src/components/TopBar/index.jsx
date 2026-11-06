import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import './styles.css';
import models from '../../modelData/models';

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();
  const parts = location.pathname.split('/').filter((p) => p.length > 0);

  let context = '';
  if (parts.length >= 2) {
    const section = parts[0];
    const userId = parts[1];
    const user = models.userModel(userId);
    if (user) {
      const fullName = `${user.first_name} ${user.last_name}`;
      if (section === 'users') {
        context = fullName;
      } else if (section === 'photos') {
        context = `Photos of ${fullName}`;
      }
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
          Trần Ngọc Huy
        </Typography>
        <Typography variant="h6" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
