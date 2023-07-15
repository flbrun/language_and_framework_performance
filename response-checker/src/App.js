import './App.css';

import React, { useState } from "react";

import ConfigurationBlock from "./configuration/ConfigurationBlock";
import ExecutionBlock from "./execution/ExecutionBlock";





function App() {
    const [selectedProtocol, setSelectedProtocol] = useState('http://');
    const [serverName, setServerName] = useState('');
    const [port, setPort] = useState('');
    const [endpoint, setEndpoint] = useState('');
    const [method, setMethod] = useState('GET');
    const [testKind, setTestKind] = useState('serial');
    const [configButton, setConfigButton] = useState('')
    const [requestsNumber, setRequestsNumber] = useState(0);
    const [parallel, setParallel] = useState(0);


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
                    requestNumber={requestsNumber}
                    setRequestNumber={setRequestsNumber}
                    parallel={parallel}
                    setParallel={setParallel}
                    configButtonCallback={configButton}
                    setConfigButton={setConfigButton}
                />
                <ExecutionBlock
                    requestNumber={requestsNumber}
                    selectedProtocol={selectedProtocol}
                    serverName={serverName}
                    port={port}
                    endpoint={endpoint}
                    parallel={parallel}
                    configButton={configButton}
                    testKind={testKind}
                    method={method}/>

            </main>
        </div>
    );
}

export default App;

