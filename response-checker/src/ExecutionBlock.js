
import {useEffect, useState} from "react";
import FileLoader from "./FileLoader";


export default function ExecutionBlock({
           selectedProtocol,
           setSelectedProtocol,
           serverName,
           setServerName,
           port,
           setPort,
           endpoint,
           setEndpoint,
           method,
           setMethod,
           testKind,
           parallel,
           setIsSerial,
           requestNumber,
           configButton,
           setConfigButton,
       }) {

        if (configButton === "Create Curl") {
            switch (testKind) {
                case 'parallel':{
                    return <FileLoader
                        method={method}
                        serverName={serverName}
                        port={port}
                        endpoint={endpoint}
                        requestNumber={requestNumber}/>
                }
                default: return <p>Wrong input</p>

            }

        }
    return <p> {testKind}</p>

}