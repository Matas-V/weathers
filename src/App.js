import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './app.css';

import Home from './components/Home/Home';
import ErrorPage from './components/ErrorPage/ErrorPage';

const App = () => {

  const fetchSearchAutocomplete = async (text) => {
    const url = `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${text}`;
    const data = await fetch(url).then((res) => res.json());
    return data;
  }

  const fetchPlaceWeather = async (place) => {
    const weather = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${place}&days=4&aqi=no&alerts=yes`;
    const data = await fetch(weather).then((res) => res.json());
    return data;
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home fetchPlaceWeather={fetchPlaceWeather} fetchSearchAutocomplete={fetchSearchAutocomplete}/>
          </Route>
          <Route exact path="/error">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
