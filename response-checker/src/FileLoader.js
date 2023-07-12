import React, { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

export const FileLoader = ({method, endpoint, port, requestNumber, serverName, parallel}) => {
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

    const formatScriptContent = (content) => {
        const lines = content.split('\n');
        const formattedLines = lines.map((line, index) => {
            if (line.includes('method_tmpl'))
            {
                return line.replace('method_tmpl', method);
            }
            if (line.includes('server_tmpl'))
            {
                return line.replace('server_tmpl', serverName);
            }
            if (line.includes('port_tmpl'))
            {
                return line.replace('port_tmpl', port);
            }
            if (line.includes('endpoint_tmpl'))
            {
                return line.replace('endpoint_tmpl', endpoint);
            }
            if (line.includes('request_tmpl'))
            {
                return line.replace('request_tmpl', requestNumber);
            }
            if (line.includes('concurrency_tmpl'))
            {
                return line.replace('request_tmpl', parallel);
            }
            else {
                return line;
            }
        });

        return formattedLines.map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div>
            {scriptContents.map((script) => (
                <div key={script.fileName}>
                    {script.fileName}
                    {formatScriptContent(script.content)}
                </div>
            ))}
        </div>
    );
}

export default FileLoader;