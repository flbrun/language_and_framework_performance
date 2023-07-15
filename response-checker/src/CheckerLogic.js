import React, { useEffect, useState } from "react";
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
            console.log(results);
            setResponses(results);
            setIsLoading(false);
        });
    };

    const rawDataFormat = (data) =>
    {
        return (
            <div>
                <p>Duration: {data.duration} ms</p>
                <p>Response Status: {data.responseStatus}</p>
                <p>Response Header: {data.responseHeader}</p>
                <p>Response Body: {data.responseBody}</p>
            </div>
        )
    }

    function rawDataFrame()
    {
       return responses.map((response) => {
            if (response.responseStatus === 200)
            {
                return (
                    <div className="successFrame">
                        {rawDataFormat(response)}
                    </div>
                )
            }
            if (response.responseStatus === 404)
            {
                return (
                    <div className="warningFrame">
                        {rawDataFormat(response)}
                    </div>
                )
            }
            else
            {
                return (
                    <div className="failureFrame">
                        {rawDataFormat(response)}
                    </div>
                )
            }
        })
    }

    return (
        <div>
            <button onClick={handleClick2} disabled={isLoading}>
                {isLoading ? "Loading..." : "Fetch Data2"}
            </button>
            {rawDataFrame()}
        </div>
    )
}