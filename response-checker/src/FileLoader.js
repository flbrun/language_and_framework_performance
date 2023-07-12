import React, { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

export const FileLoader = () => {
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

    return (
        <div>
            <h1>React App</h1>
            {scriptContents.map((script) => (
                <div key={script.fileName}>
                    {script.content}
                </div>
            ))}
        </div>
    );
}

export default FileLoader;