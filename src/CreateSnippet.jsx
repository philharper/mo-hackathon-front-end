import React from "react";
import {Button, TextField, TextareaAutosize} from "@material-ui/core";
import {useState} from "react";
import Card from "@material-ui/core/Card";

export default function CreateSnippet() {

    const snippetSaveUrl = 'https://mo-hackathon.herokuapp.com/snippet'

    const [title, setTitle] = useState("");
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
            body: JSON.stringify({title, value:snippet, tags})
        }).then(response => response.json())
            .then(result => {
                setSnippet("");
                setTitle("");
                setTags("");
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
                <h1>Save a snippet and help the team!</h1>
                <div style={{marginBottom: "10px"}}>
                    <TextField value={title}  label='Title' onChange={(e) => {
                        resetErrorAndSaved();
                        setTitle(e.target.value)}
                    } />
                </div>
                <div style={{marginBottom: "10px"}}>
                    <TextareaAutosize value={snippet} rowsMin="8" onChange={(e) => {
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