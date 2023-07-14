import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
const { ipcRenderer } = window.require('electron');


export const FileLoader = ({method, endpoint, port, requestNumber, serverName, parallel, testKind}) => {
    const [scriptContents, setScriptContents] = useState([]);

    useEffect(() => {
        ipcRenderer.on('script-contents', (event, contents) => {
            setScriptContents(contents);
        });

        ipcRenderer.invoke('script-contents').then((contents) => {
            setScriptContents(contents);
        }).catch((error) => {
            console.error('Error getting script contents:', error);
        });

        return () => {
            ipcRenderer.removeAllListeners('script-contents');
        };
    }, []);
    const specifyScript = (name) => {
        const selectedScript = scriptContents.find((script) => script.fileName === name);
        // return selectedScript ? <SyntaxHighlighter children={selectedScript.content} language="bash" style={dracula} />: null;
         return selectedScript ? formatScriptContent(selectedScript.content): null;

    };

    const renderContent = () => {
        switch (testKind) {
            case 'seriell':
                return specifyScript('script-seriell.sh');
            case 'parallel':
                return specifyScript('script-parallel.sh');
            default:
                return null;
        }
    };

    const formatScriptContent = (content) => {
        const placeholders = {
            'method_tmpl': method,
            'server_tmpl': serverName,
            'port_tmpl': port,
            'endpoint_tmpl': endpoint,
            'request_tmpl': requestNumber,
            'concurrency_tmpl': parallel
        };


        for (const placeholder in placeholders) {
            if (content.includes(placeholder)) {
                content = content.replace(placeholder, placeholders[placeholder]);
            }
        }

        return <SyntaxHighlighter children={content} language="bash"/>


    };

    return (
            <div className="Code_block">
                {renderContent()}
            </div>
    );
}

export default FileLoader;