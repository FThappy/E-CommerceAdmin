import React, { useState, useRef } from 'react';
import './topbar.css';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Language, Settings } from '@mui/icons-material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../redux/userRedux';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleOut = () => {
    dispatch(deleteUser(user));
  };

  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <Link to={'/'} className='link'>
            <span className='logo'>
              BearAdmin
              <img
                src='https://cdn.icon-icons.com/icons2/1929/PNG/512/iconfinder-panda-4591884_122127.png'
                alt='a'
                style={{ width: '5%' }}
              />
            </span>
          </Link>
        </div>
        <div className='topRight'>
          <img src={user?.img} alt='' className='topAvatar' onClick={handleToggle} ref={anchorRef} />
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement='bottom-start'
            transition
            disablePortal
            sx={{ zIndex: 999 }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id='composition-menu' aria-labelledby='composition-button'>
                      <Link to={'/user/' + user?._id} className='link'>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                      </Link>
                      <MenuItem onClick={handleClose}>
                        <Button onClick={handleOut}>LogOut</Button>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
}
