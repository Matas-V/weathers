import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainCon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '1150px',
    width: '80vw',
    margin: 'auto',
    height: '100px',
    [theme.breakpoints.down('750')]: {
      width: '95vw',
    }
  },
  offset: theme.mixins.toolbar,
  timeline: {
    position: 'relative',
    height: '15px',
    width: '100%',
    borderRadius: '15px',
    border: 'solid black 2px',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  "@keyframes progress-animation": {
    "0%": {
      backgroundPosition: '100%',
    },
    "100%": {
      backgroundPosition: '0',
    }
  },
  timeProgress: {
    height: '11px',
    borderRadius: '15px',
    background: 'repeating-linear-gradient(45deg, #73a6e4 7%, #488BDC 12%)',
    backgroundSize: '250% 100%',
    animation: '$progress-animation 7.2s linear infinite',
  },
  timesCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  timelineDisplay: {
    [theme.breakpoints.down('400')]: {
      display: 'none',
    }
  },
  text: {
    [theme.breakpoints.down('750')]: {
      fontSize: '0.7rem'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      transform: 'translate(-270%, -140%)',
      borderRadius: '50%',
      border: 'solid 4px #f1f1f1',
    }
  },
  clockCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '1.5rem',
  },
  clock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '3rem',
    height: '100%',
    margin: '0 20px',
    cursor: 'pointer',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  info: {
    position: 'relative',
    top: '-60px',
    right: '-55px',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

export default useStyles;