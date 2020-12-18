import './App.css';
import React, {useEffect, useState} from "react";
import CreateSnippet from './CreateSnippet';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

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
      textAlign: "left",
      color: "#FFF !important"
  },
}));

function App() {

  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const response = getHello();
  const classes = useStyles();

    const doSearch = (query) => {
        fetch(hirokubase + "/snippet?tagName=" + query, {method: 'GET'})
            .then(res => res.json())
            .then(
                (result) => {
                    setSearchResult(result);
                    console.log(result);
                },
                (error) => {
                    console.error("ERROR CALLING API", error);
                }
            )
    }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <a style={{color: "#FFF"}} href="/">Giblets</a>
          </Typography>
            <Button>Create</Button>
            <div style={{padding: "3px", border: "1px solid white"}}>
                <TextField value={query} onChange={(e) => {
                    setQuery(e.target.value)
                }} />
                <Button onClick={() => {
                    doSearch(query);
                }}>Search</Button>
            </div>
        </Toolbar>
      </AppBar>

      <CreateSnippet />

        {searchResult && searchResult.length > 0 &&
            <div>
                <ul>
                {searchResult.map(
                    (result, index) => {
                        return (<li key={index}>
                            {result.title}
                        </li>)
                    }
                )}
                </ul>
            </div>
        }
      {response}
    </div>
  );
}

export default App;
