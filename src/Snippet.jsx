import React, {useState} from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Snippet = (props) => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <h3>
                <a style={{cursor: "pointer"}} onClick={ () => { setShowDetails(!showDetails) } }
                >{props.snippet.title + " | " + props.snippet.language}</a>
            </h3>
            { showDetails &&
                <>
                <SyntaxHighlighter style={xonokai} showLineNumbers language={props.snippet.language}>
                    {props.snippet.value}
                </SyntaxHighlighter>
                    <ul>
                    {props.snippet.tags.map((tag, index) => {
                        return (
                            <li key={index}>{tag}</li>
                        )
                    })
                }
                </ul>
                </>
            }
        </>
    )
}

export default Snippet;