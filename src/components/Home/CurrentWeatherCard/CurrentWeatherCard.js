import React from 'react';
import { Typography, Card, CardContent, Button } from '@material-ui/core';
import IconInfo from '../IconInfo';
import Clock from 'react-live-clock';
import { FaCloud, FaWind, FaRegCompass } from 'react-icons/fa';
import { WiThermometer } from 'react-icons/wi';
import useStyles from '../styles';

const CurrentWeatherCard = ({ location, current, tempUnit, fetchMainDisplay }) => {
  const classes = useStyles();

  const { country, name, region, tz_id } = location;
  const { feelslike_c, feelslike_f, wind_kph, wind_dir, condition: { icon, text }, cloud, temp_c, temp_f } = current;

  const handleWeatherDetails = (place) => {
    window.scroll(0,0);
    fetchMainDisplay(place);
  }

  return (
    <Card variant="outlined" style={{ maxWidth: '400px' }}>
      <CardContent align="center">
        <Typography variant="h4" align="center">{name}</Typography>
        <Typography variant="subtitle2" gutterBottom align="center">{country}, {region}</Typography>

        <div style={{ marginBottom: '15px' }}>
          <Typography variant="h5"><Clock format={'HH:mm:ss'} ticking={true} timezone={`${tz_id}`} /></Typography>
          <img title={text} src={icon} alt={text}/>
          <Typography variant="subtitle2" align="center"><b>{tempUnit ? Math.round(temp_c) + '°C' : Math.round(temp_f) + '°F'}</b></Typography>
          <IconInfo
            icon={<WiThermometer className={classes.iconStyles}/>}
            text={tempUnit ? Math.round(feelslike_c) + '°C' : Math.round(feelslike_f) + '°F'}
            explanation={'Feels Like'}
          />
          <IconInfo
            icon={<FaCloud className={classes.iconStyles}/>}
            text={`${cloud}%`}
            explanation={'Cloudiness'}
          />
          <IconInfo
            icon={<FaWind className={classes.iconStyles}/>}
            text={`${Math.round(wind_kph * 1000 / 360) / 10} m/s`}
            explanation={'Wind Speed'}
          />
          <IconInfo
            icon={<FaRegCompass className={classes.iconStyles}/>}
            text={`${wind_dir}`}
            explanation={'Wind Direction'}
          />
        </div>

        <Button color="primary" variant="contained" onClick={() => handleWeatherDetails(name)}>More Details</Button>
      </CardContent>
    </Card>
  )
}

export default CurrentWeatherCard;
