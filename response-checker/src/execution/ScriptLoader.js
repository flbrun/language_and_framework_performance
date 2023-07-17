import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { ipcRenderer } = window.require('electron');


export const ScriptLoader = ({method, endpoint, port, requestNumber, serverName, parallel, testKind}) => {

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

    const formatScriptContent = (content, name, language) => {
        const placeholders = {
            'method_tmpl': method,
            'server_tmpl': serverName,
            'port_tmpl': port,
            'endpoint_tmpl': endpoint,
            'request_tmpl': requestNumber,
            'concurrency_tmpl': parallel
        };

       switch (name)
       {
           case 'script-parallel.sh':
               name = "Linux Script (Parallel)";
               break;
           case 'script-serial.sh':
               name = "Linux Script (Serial)";
               break;
           case 'windows-script-parallel.bat':
               name = "Windows Script (Parallel)";
               break;
           case 'windows-script-serial.bat':
               name = "Windows Script (Serial)";
               break;
           default:
       }

        for (const placeholder in placeholders) {
            if (content.includes(placeholder)) {
                content = content.replace(placeholder, placeholders[placeholder]);
            }
        }

        return (
            <div className="Generic-frame">
                <h2 className="Generic-headline">{name}</h2>
                    <div className="Code_block">
                        <SyntaxHighlighter children={content} language={language} style={coy} wrapLongLines={true}/>
                    </div>
            </div>
        )

    };

    const specifyScript = (name, language) => {
        const selectedScript = scriptContents.find((script) => script.fileName === name);
         return selectedScript ? formatScriptContent(selectedScript.content, selectedScript.fileName, language): null;

    };

    const renderContent = () => {
        switch (testKind) {
            case 'serial': {
                return [
                    specifyScript('script-serial.sh', "bash"),
                    specifyScript('windows-script-serial.bat', "batch")
                ];
            }
            case 'parallel': {
                return [
                    specifyScript('script-parallel.sh',"bash"),
                    specifyScript('windows-script-parallel.bat', "batch")
                ];
            }
            default: return null;
        }
    };

    return (
        <div className="Script">
            { renderContent()}
        </div>
    )

}

export default ScriptLoader;