import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Container, Button } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import { ImSad } from 'react-icons/im';

import useStyles from './styles';

const ErrorPage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" align="center" className={classes.container}>
        <ImSad className={classes.icon} />
        <Typography variant="h5" gutterBottom>We are sorry, but we could not find that location or something went wrong..</Typography>
        <Button variant="contained" color="primary" onClick={() => history.push('/')}>
          Go Back
        </Button>
      </Container>
    </div>
  )
}

export default ErrorPage;
