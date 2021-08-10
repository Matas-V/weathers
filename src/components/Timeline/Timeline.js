import React, { useState } from 'react';
import { Typography, Fade, Popover } from '@material-ui/core';
import Clock from 'react-live-clock';
import useStyles from './styles';
import { FcClock } from 'react-icons/fc';
import { IoInformationCircleSharp } from 'react-icons/io5';

const Timeline = ({ value, data }) => {
  const classes = useStyles();
  const clock = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);

  const handlePopoverClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <div className={classes.mainCon}>
      <div className={classes.offset} />
      <div>
        <div className={classes.clockCon}>
          <Typography variant="h3">{data.location?.name}</Typography>
          <span aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
            <FcClock className={classes.clock}/>
            <IoInformationCircleSharp className={classes.info} />
          </span>

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
            <Typography variant="subtitle2" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
              <Clock format={'HH:mm:ss'} ticking={true} timezone={`${data.location?.tz_id}`} />
            </Typography>
          </Popover>

        </div>
        <Typography variant="subtitle1" gutterBottom align="center">{data.location?.country}, {data.location?.region}</Typography>
      </div>
      <div className={classes.timelineDisplay}>
        <Fade in={true} timeout={1000}>
          <div>
            <div className={classes.timeline}>
              <div className={classes.timeProgress} style={{ width: `${value}%` }} />
            </div>
            <div className={classes.timesCon}>
              {clock.map((item, i) => (
                <Typography key={i} variant="subtitle2" className={classes.text}>{item}</Typography>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

export default Timeline;
