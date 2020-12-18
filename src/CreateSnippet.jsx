import React from "react";
import {Button, TextField, TextareaAutosize} from "@material-ui/core";
import {useState} from "react";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {languages} from "./languages";

export default function CreateSnippet() {

    const snippetSaveUrl = 'https://mo-hackathon.herokuapp.com/snippet'

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [snippet, setSnippet] = useState("");
    const [tags, setTags] = useState("");
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState(false);

    const resetErrorAndSaved = () => {
        setSaved(false);
        setError(false);
    }

    const saveSnippet = () => {
        console.log(title, snippet, tags);
        fetch(snippetSaveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({title, value:snippet, tags, language})
        }).then(response => response.json())
            .then(result => {
                setSnippet("");
                setTitle("");
                setTags("");
                setLanguage("");
                setSaved(true);
                setError(false);
                console.log(result)
            })
            .catch(err => {
                console.log(err);
                setError(true);
                setSaved(false);
            })
    }

    return(
        <>

            <Card style={{margin: "10px", padding: "10px", textAlign: "left"}}>
                <div style={{marginBottom: "10px"}}>
                    <TextField value={title}  label='Title' onChange={(e) => {
                        resetErrorAndSaved();
                        setTitle(e.target.value)}
                    } />
                </div>
                <div style={{marginBottom: "10px"}}>
                    <Select
                        id="demo-simple-select"
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value)
                        }}
                    >{
                        languages.map((language) => {
                            return(<MenuItem value={language}>{language}</MenuItem>)
                        })

                    }
                    </Select>
                </div>
                <div style={{marginBottom: "10px"}}>
                    <TextareaAutosize style={{width: "800px"}} value={snippet} rowsMin="8" onChange={(e) => {
                        resetErrorAndSaved();
                        setSnippet(e.target.value)
                    }} />
                </div>
                <div style={{marginBottom: "10px"}}>
                    <TextField value={tags}  label='Tags' onChange={(e) => {
                        resetErrorAndSaved();
                        setTags(e.target.value)
                    }} />
                </div>
                <Button style={{marginBottom: "10px"}} variant="contained" onClick={saveSnippet}>Save</Button>
                {saved &&
                    <div style={{color:"#0F0"}}>Snippet saved</div>
                }
                {error &&
                    <div style={{color:"#F00"}}>Error saving snippet</div>
                }
            </Card>

        </>
    )

}