import React from "react";
import {Button, TextField, TextareaAutosize} from "@material-ui/core";
import {useState} from "react";
import Card from "@material-ui/core/Card";

export default function CreateSnippit() {

    const [title, setTitle] = useState("");
    const [snippit, setSnippit] = useState("");
    const [tags, setTags] = useState("");

    const saveSnippit = () => {
        console.log(title, snippit, tags);
        fetch(hirokubase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({title, value:snippit, tags})
        }).then(response => response.json())
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    return(
        <>
            <h1>Save a snippit and help the team!</h1>
            <Card>
                <div>
                    <TextField value={title}  label='Title' onChange={(e) => setTitle(e.target.value) } />
                </div>
                <div>
                    <TextareaAutosize value={snippit} rowsMin="8" onChange={(e) => setSnippit(e.target.value) } />
                </div>
                <div>
                    <TextField value={tags}  label='Tags' onChange={(e) => setTags(e.target.value) } />
                </div>
                <Button onClick={saveSnippit}>Save</Button>
            </Card>

        </>
    )

}