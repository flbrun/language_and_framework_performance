import {buttonOptions} from "./ConfigurationButton";

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
       })
{
    if(configButton === "Create Curl")
    {
        switch (testKind) {

        }
        return <p> {configButton}</p>
    }
    return <p> hi</p>

}
