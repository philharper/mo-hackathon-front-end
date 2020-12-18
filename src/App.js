import './App.css';
import React from "react";
import CreateSnippit from './CreateSnippit';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const hirokubase = 'https://mo-hackathon.herokuapp.com/'

const getHello = () => {
  fetch(hirokubase, {method: 'GET'})
      .then(res => res.json())
      .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.error("ERROR CALLING API", error);
          }
      )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {

  const response = getHello();

  const classes = useStyles();

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Giblets
          </Typography>
        </Toolbar>
      </AppBar>

      <CreateSnippit />
      {response}
    </div>
  );
}

export default App;
