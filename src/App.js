import './App.css';
import React, {useState} from "react";
import CreateSnippet from './CreateSnippet';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Snippet from "./Snippet";
import Card from "@material-ui/core/Card";

const herokuBase = 'https://mo-hackathon.herokuapp.com/'

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
  const [showSave, setShowSave] = useState(false);
  const classes = useStyles();

    const doSearch = (query) => {
        fetch(herokuBase + "/snippet?tagName=" + query, {method: 'GET'})
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
        </Toolbar>
      </AppBar>

        <h1 style={{align: "left", textAlign: "left", margin: "10px"}}><a style={{cursor: "pointer"}} onClick={()=>setShowSave(!showSave)}>
            {showSave &&
             " - "
            }
            {!showSave &&
            " + "
            }
            Save a snippet and help the team!
        </a></h1>
        {showSave &&
            <CreateSnippet/>
        }

        <Card style={{margin: "10px"}}>
            <div style={{margin: "10px", textAlign: "left", padding: "3px", border: "1px solid white"}}>
                <h1>Search for awesome code!</h1>
                <TextField value={query} onChange={(e) => {
                    setQuery(e.target.value)
                }} />
                <Button onClick={() => {
                    doSearch(query);
                }}>Search</Button>
            </div>
        </Card>
        {searchResult && searchResult.length > 0 &&
        <Card style={{margin: "10px"}}>
            <div style={{margin: "10px", textAlign: "left", padding: "3px", border: "1px solid white"}}>
                <h1>Search results</h1>
                <div style={{align: "left", textAlign: "left"}}>
                    <ul>
                        {searchResult.map(
                            (result, index) => {
                                return (<Snippet key={index} open={searchResult.length === 1} snippet={result}/>)
                            }
                        )}
                    </ul>
                </div>
            </div>
        </Card>
        }
    </div>
  );
}

export default App;
