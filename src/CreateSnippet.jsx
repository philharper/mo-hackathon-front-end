import React from "react";
import {Button, TextField, TextareaAutosize} from "@material-ui/core";
import {useState} from "react";
import Card from "@material-ui/core/Card";

export default function CreateSnippet() {

    const snippetSaveUrl = 'https://mo-hackathon.herokuapp.com/snippet'

    const [title, setTitle] = useState("");
    const [snippet, setSnippet] = useState("");
    const [tags, setTags] = useState("");

    const saveSnippet = () => {
        console.log(title, snippet, tags);
        fetch(snippetSaveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({title, value:snippet, tags})
        }).then(response => response.json())
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    return(
        <>
            <h1>Save a snippet and help the team!</h1>
            <Card>
                <div>
                    <TextField value={title}  label='Title' onChange={(e) => setTitle(e.target.value) } />
                </div>
                <div>
                    <TextareaAutosize value={snippet} rowsMin="8" onChange={(e) => setSnippet(e.target.value) } />
                </div>
                <div>
                    <TextField value={tags}  label='Tags' onChange={(e) => setTags(e.target.value) } />
                </div>
                <Button onClick={saveSnippet}>Save</Button>
            </Card>

        </>
    )

}