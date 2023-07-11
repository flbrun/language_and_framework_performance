import './App.css';

import React, { useState } from "react";

import ConfigurationBlock from "./ConfigurationBlock";
import ExecutionBlock from "./ExecutionBlock";





function App() {
    const [selectedProtocol, setSelectedProtocol] = useState('http://');
    const [serverName, setServerName] = useState('');
    const [port, setPort] = useState('');
    const [endpoint, setEndpoint] = useState('');
    const [method, setMethod] = useState('GET');
    const [testKind, setTestKind] = useState('seriell');
    const [configButton, setConfigButton] = useState('')


    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    //
    //     const url = selectedProtocol + serverName + ':' + port;
    //
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    return (
        <div className="App">
            <header className="App-header">
                <p>Response Checker</p>
            </header>
            <main>
                <ConfigurationBlock
                    selectedProtocol={selectedProtocol}
                    setSelectedProtocol={setSelectedProtocol}
                    serverName={serverName}
                    setServerName={setServerName}
                    port={port}
                    setPort={setPort}
                    endpoint={endpoint}
                    setEndpoint={setEndpoint}
                    method={method}
                    setMethod={setMethod}
                    testKind={testKind}
                    setTestKind={setTestKind}
                    configButtonCallback={configButton}
                    setConfigButton={setConfigButton}
                />
                <ExecutionBlock configButton={configButton}/>

            </main>
        </div>
    );
}

export default App;
