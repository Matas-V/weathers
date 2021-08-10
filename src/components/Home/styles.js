import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainDisplay: {
    margin: '70px auto',
  },
  switchCon: {
    textAlign: 'center',
  },
  weathersCon: {
    marginTop: '100px',
  },
  mainDisplayButton: {
    backgroundColor: 'white',
    borderRadius: '5px',
    height: 'auto',
    border: 'solid #f5f4f4 2px',
    width: 'calc(100% / 3)',
    '&:hover': {
      border: 'lightblue 2px solid',
    }
  },
  activeDay: {
    border: `${theme.palette.primary.dark} 2px solid`,
    outline: 'none',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollbar: {
    [theme.breakpoints.down('820')]: {
      overflowX: 'scroll',
      marginBottom: '1.5rem',
      '&::-webkit-scrollbar': {
        height: '6px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f6fc',
        borderRadius: '100px',
        margin: '0 10px'
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '100px',
        backgroundColor: 'lightgrey',
      }
    }
  },
  cardContent: {
    textAlign: 'center',
  },
  iconCon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyles: {
    color: '#75b6e8',
    marginRight: '5px',
  },
  switchRoot: {
    height: '50px',
    width: '80px',
  },
  switchBase: {
    width: "26px",
    height: "26px",
    top: "50%",
    padding: "4px",
    /* To center element
       marginTop: calc(-elemntHeight / 2 - padding) */
    marginTop: "calc(-26px / 2)",
    backgroundColor: theme.palette.primary.main,
    transform: "translateX(10px)",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    }
  },
  switchBaseChecked: {
    transform: "translateX(45px) !important",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    }
  },
  switchTrack: {
    borderRadius: "20px",
    border: 'solid black 1px',
    backgroundColor: '#75b6e8',
  },
  switchInput: {
    left: '-120%',
    width: '400%',
  },
  divider: {
    display: 'block',
    height: '1px',
    border: '0',
    borderTop: '2px solid #ccc',
    width: '100%',
    margin: '1em 0',
    padding: '0',
    marginLeft: '10px',
  },
  windTitle: {
    position: 'absolute',
    transform: 'translate(0, -16px)',
    maxWidth: '910px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  astroTitle: {
    position: 'absolute',
    maxWidth: '910px',
    transform: 'translate(0, -16px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  windCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  astroCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  astroIcons: {
    marginRight: '5px',
    fontSize: '2rem',
  },
  astroInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: '30px 0',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
}));

export default useStyles;