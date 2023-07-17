import React, { useState } from "react";
import {RawDataField} from "./RawDataField";
import {DurationOverTime} from "./durationOverTime";
const { ipcRenderer } = window.require('electron');

export default function CheckerLogic({
                                         selectedProtocol,
                                         serverName,
                                         port,
                                         endpoint,
                                         requestNumber,
                                         method,
                                         testKind,
                                         parallel,
                                     }) {
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick2 = async() => {
        setIsLoading(true);
        const loadTestOptions = {
            selectedProtocol: selectedProtocol,
            serverName: serverName,
            port: port,
            endpoint: endpoint,
            requestNumber: requestNumber,
        };

        ipcRenderer.send('startLoadTest', loadTestOptions);

        ipcRenderer.on('loadTestResults', (event, results) => {
            setResponses(results);
            setIsLoading(false);
        });
    };

    return (
        <div>
            <button onClick={handleClick2} disabled={isLoading}>
                {isLoading ? "Loading..." : "Fetch Data2"}
            </button>
            <div className="datafields">
                <div className="dataElement">
                    <RawDataField responses={responses}/>
                </div>
                <div className="dataElement">
                    <DurationOverTime responses={responses}/>
                </div>
            </div>
        </div>
    )
}