import React, { useState, useEffect } from 'react';
import { AppBar, Typography, InputBase, Toolbar, Paper, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import photo from '../../utils/weather-icon.ico';
import useStyles from './styles';

const Navbar = ({ fetchSearchAutocomplete, fetchMainDisplay }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const classes = useStyles();

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMainDisplay(search);
    setSearch('');
  }

  const handleSearchPick = (e, url) => {
    e.preventDefault();
    fetchMainDisplay(url);
    setSearch('');
  }

  const handleOnBlur = () => {
    document.getElementById('suggestionsCon').classList.add(`${classes.hideSuggestions}`);
    document.getElementById('suggestionsCon').classList.remove(`${classes.showSuggestions}`);
  }

  const handleFocus = () => {
    document.getElementById('suggestionsCon').classList.add(`${classes.showSuggestions}`);
    document.getElementById('suggestionsCon').classList.remove(`${classes.hideSuggestions}`);
  }

  useEffect(() => {
    const handleAutocomplete = async (text) => {
      const suggestions = await fetchSearchAutocomplete(text);
      setSuggestions(suggestions);
    }

    if (search && search.length >= 3) handleAutocomplete(search);else setSuggestions([]);
  }, [search]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.centerItems} style={{ margin: '15px 0' }}>
          <div className={classes.centerItems}>
            <img src={photo} alt="logo"/>
            <Typography className={classes.title} variant="h6" noWrap>
              Weather app
            </Typography>
          </div>
          <form onSubmit={(e) => handleSearch(e)} onBlur={handleOnBlur} onFocus={handleFocus}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              {suggestions &&
                <div id="suggestionsCon" className={classes.suggestions}>       
                  {suggestions.map((item, i) => {
                    const { id, name, url } = item;

                    if (i >= 6) return null;

                    return (
                      <Paper key={id}>
                        <Button fullWidth variant="outlined" onMouseDown={(e) => handleSearchPick(e, url)}>{name}</Button>
                      </Paper>
                    )
                  })}
                </div>
              }
            </div>
          </form>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar;
