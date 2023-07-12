
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
           setParallelRequests,
           setIsSerial,
           configButton,
           setConfigButton,
       }) {

        if (configButton === "Create Curl") {
            switch (testKind) {
                case 'parallel':{
                    return <FileLoader/>
                }
                default: return <p>Wrong input</p>

            }

        }
    return <p> {configButton}</p>

}