import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import useWindowSize from '../../utils/use-window-size';
import Timeline from '../Timeline/Timeline';
import CurrentWeatherCard from './CurrentWeatherCard/CurrentWeatherCard';
import IconInfo from './IconInfo';

import { useHistory } from 'react-router-dom';
import { Container, Card, CardContent, Button, Typography, Switch, Grid } from '@material-ui/core';
import { FaSnowflake, FaCloud, FaWind, FaRegCompass, FaCalendarDay } from 'react-icons/fa';
import { WiThermometer, WiMoonrise, WiMoonset, WiSunset, WiSunrise } from 'react-icons/wi';
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri';
import { GiMoonOrbit } from 'react-icons/gi';
import { BiCool } from 'react-icons/bi';
import { ImDroplet } from 'react-icons/im';
import useStyles from './styles';

const mainCities = ['London', 'Paris', 'Berlin', 'Vilnius', 'Athens', 'Milan'];

const localStore = () => {
  if (localStorage.getItem('lastPlace')) {
    return localStorage.getItem('lastPlace');
  } else {
    localStorage.setItem('lastPlace', 'Vilnius');
    return 'Vilnius';
  }
}

const Home = ({ fetchPlaceWeather, fetchSearchAutocomplete }) => {
  const [progress, setProgress] = useState(0);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [hours, setHours] = useState([]);
  const [dates, setDates] = useState([]);
  const [astro, setAstro] = useState([]);
  const [tempUnit, setTempUnit] = useState(true);
  const [dayIdDisplay, setDayIdDisplay] = useState('');
  const [defaultCity, setDefaultCity] = useState(localStore());
  const [dividerSize, setDividerSize] = useState(0);
  const windowSize = useWindowSize();
  const classes = useStyles();
  const history = useHistory();

  const handleTempUnit = () => setTempUnit(!tempUnit);

  const handleDayChange = (date, index) => {
    document.getElementById(`${dayIdDisplay}`).classList.remove(`${classes.activeDay}`);
    document.getElementById(`${date}`).classList.add(`${classes.activeDay}`);
    setDayIdDisplay(date);
    setHours(city.forecast.forecastday[index].hour);
    setAstro(city.forecast.forecastday[index].astro);
  }

  const fetchMainDisplay = async (place) => {
    try {
      const data = await fetchPlaceWeather(place);
      setCity(data);
      setHours(data.forecast.forecastday[0].hour);
      setDates(data.forecast.forecastday);
      setAstro(data.forecast.forecastday[0].astro);
      setDefaultCity(data.location.name);
      setDayIdDisplay(data.forecast.forecastday[0].date);
      if (dayIdDisplay) {
        document.getElementById(`${dayIdDisplay}`).classList.remove(`${classes.activeDay}`);
      }
      document.getElementById(`${data.forecast.forecastday[0].date}`).classList.add(`${classes.activeDay}`);
      // handleDayChange(data.forecast.forecastday[0].date, 0);

      /// setting the last place weather to be the default load
      localStorage.setItem('lastPlace', data.location.name);

      /// getting time for timeline
      const { location: { localtime } } = data;
      const timeString = localtime.substr(11, localtime.length).split(":").join("");
      const timeInMinutes = timeString.length === 4 ? parseInt(timeString.substr(0, 2)) * 60 + parseInt(timeString.substr(2, 2)) : parseInt(timeString.substr(0, 1)) * 60 + parseInt(timeString.substr(1, 2));
      const barProgress = Math.round(timeInMinutes * 100 / 1439);
      setProgress(barProgress);
    } catch (error) {
      console.log(error);
      history.push('/error');
    }
  }

  const fetchMainCities = async () => {
    try {
      const promises = mainCities.map((city) => fetchPlaceWeather(city));
      const result = await Promise.all(promises).then(res => setCities(res));
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setDividerSize(document.getElementById('weatherCard').offsetWidth);
  }, [windowSize]);

  useEffect(() => {
    fetchMainDisplay(defaultCity);
    fetchMainCities();
  }, []);

  return (
    <div>
      <Navbar fetchSearchAutocomplete={fetchSearchAutocomplete} fetchMainDisplay={fetchMainDisplay} setCity={setCity} />
      <Timeline value={progress} data={city} />

      <main className={classes.mainDisplay}>
        <Container align="center">
          <Switch
            checked={tempUnit}
            checkedIcon={<RiCelsiusFill />}
            icon={<RiFahrenheitFill />}
            onChange={handleTempUnit}
            color="default"
            classes={{
              root: classes.switchRoot,
              switchBase: classes.switchBase,
              track: classes.switchTrack,
              checked: classes.switchBaseChecked,
              input: classes.switchInput,
            }}
          />
        </Container>

        <Container maxWidth="md">
          <div style={{ width: '100%' }} >
            {dates.map((item, i) => {
              const { date } = item;
              return (
                <Button id={date} key={i} className={classes.mainDisplayButton} onClick={(e) => handleDayChange(date, i)}><b><FaCalendarDay className={classes.iconStyles} />{date}</b></Button>
              )
            })}
          </div>
        </Container>

        <Container maxWidth="md">
          <Card id="weatherCard" variant="outlined">

            <div className={classes.scrollbar}>

              <div className={classes.card}>
                {hours.map((item, i) => {
                  if (i % 3 !== 0) return null;
                  const { chance_of_rain, chance_of_snow, cloud, condition: { icon, text }, temp_c, temp_f, feelslike_c, feelslike_f, time } = item;

                  return (
                    <CardContent key={i} className={classes.cardContent}>
                      <Typography variant="subtitle2" align="center"><b>{time.substr(11, 5)}</b></Typography>
                      <img src={icon} title={text} alt={text}/>
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
                        icon={<ImDroplet className={classes.iconStyles}/>}
                        text={`${chance_of_rain}%`}
                        explanation={'Chance of rain'}
                      />
                      <IconInfo
                        icon={<FaSnowflake className={classes.iconStyles}/>}
                        text={`${chance_of_snow}%`}
                        explanation={'Chance of snow'}
                      />
                    </CardContent>
                  )
                })}
              </div>

              <div>
                <Container className={classes.windTitle} style={{ maxWidth: `${dividerSize}px` }}>
                  <Typography variant="subtitle1"><FaWind className={classes.iconStyles} /><b>Wind Speed, m/s</b></Typography>
                  <div className={classes.divider} />
                </Container>
                <div className={classes.windCon}>
                  {hours.map((item, i) => {
                    if (i % 3 !== 0) return null;
                    const { wind_dir, wind_kph } = item;

                    return (
                      <CardContent key={i} style={{ minWidth: '96px' }}>
                        <IconInfo
                          icon={<FaWind className={classes.iconStyles}/>}
                          text={`${Math.round(wind_kph * 1000 / 360) / 10}`}
                          explanation={'Wind Speed'}
                        />
                        <IconInfo
                          icon={<FaRegCompass className={classes.iconStyles}/>}
                          text={`${wind_dir}`}
                          explanation={'Wind Direction'}
                        />
                      </CardContent>
                    )
                  })}
                </div>
              </div>

            </div>

            <div className={classes.scrollbar}>
              <Container className={classes.astroTitle} style={{ maxWidth: `${dividerSize}px` }}>
                <Typography variant="subtitle1"><GiMoonOrbit className={classes.iconStyles} /><b>Astro Info</b></Typography>
                <div className={classes.divider} />
              </Container>
              <Container className={classes.astroCon}>

                <CardContent>
                  <Typography variant="subtitle1" gutterBottom className={classes.astroInfo}><WiSunrise className={classes.astroIcons} style={{ color: '#e9c616' }} /><b>Sunrise</b></Typography>
                  <Typography align="center" variant="subtitle2" gutterBottom><b>{astro.sunrise}</b></Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom className={classes.astroInfo}><WiSunset className={classes.astroIcons} style={{ color: '#e9c616' }} /><b>Sunset</b></Typography>
                  <Typography align="center" variant="subtitle2" gutterBottom><b>{astro.sunset}</b></Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom className={classes.astroInfo}><WiMoonrise className={classes.astroIcons} style={{ color: '#8c98a6' }} /><b>Moonrise</b></Typography>
                  <Typography align="center" variant="subtitle2" gutterBottom><b>{astro.moonrise}</b></Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom className={classes.astroInfo}><WiMoonset className={classes.astroIcons} style={{ color: '#8c98a6' }} /><b>Moonset</b></Typography>
                  <Typography align="center" variant="subtitle2" gutterBottom><b>{astro.moonset}</b></Typography>
                </CardContent>

              </Container>
            </div>
          </Card>
        </Container>

        <Container maxWidth="md" className={classes.weathersCon}>
          <Typography align="center" color="primary" variant="h4" gutterBottom style={{ marginBottom: '3rem' }} >Current Weather in Europe</Typography>
          <Grid container alignContent="center" spacing={5} justifyContent="center">
            {cities.map((city, i) => {
                const { location, current } = city;
                return (
                  <Grid key={i} item sm={6} xs={12} align="center">
                    <CurrentWeatherCard location={location} current={current} tempUnit={tempUnit} fetchMainDisplay={fetchMainDisplay}/>
                  </Grid>
                )
              })
            }
          </Grid>
        </Container>
      </main>

      <footer className={classes.footer}>
        <div style={{ margin: '0 10px' }}>
          <Typography align="center" variant="h6" gutterBottom>Weather app to check if it is sunny enough to go outside <BiCool /></Typography>
          <Typography align="center" variant="subtitle1">Designed by: Matas Valatka</Typography>
        </div>
        <a style={{ margin: '0 10px' }} href="https://www.weatherapi.com/" title="Free Weather API" target="_blank" rel="noreferrer">
          <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0" />
        </a>
      </footer>
    </div>
  )
}

export default Home;
