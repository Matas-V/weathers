import React, { useState } from 'react';
import { Typography, Popover } from '@material-ui/core';
import useStyles from './styles';

const IconInfo = ({ icon, text, explanation }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);

  const handlePopoverClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <div className={classes.iconCon}>
      <span aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" style={{ width: '16px', height: '16px', marginRight: '5px' }} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>{icon}</span>
      <Popover
        id="mouse-over-popover"
        open={open}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        anchorEl={anchorEl} 
        onClose={handlePopoverClose} 
        disableRestoreFocus 
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography variant="subtitle2">{explanation}</Typography>
      </Popover>
      <Typography align="center" variant="subtitle2">
        <b>{text}</b>
      </Typography>
    </div>
  )
}

export default IconInfo;
