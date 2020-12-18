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