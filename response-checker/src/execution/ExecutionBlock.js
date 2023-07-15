import ScriptLoader from "./ScriptLoader";
import CheckerLogic from "./CheckerLogic";

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

    const renderContent = () => {
        if (configButton === "Create Script") {
            return<ScriptLoader
                testKind={testKind}
                method={method}
                serverName={serverName}
                port={port}
                endpoint={endpoint}
                requestNumber={requestNumber}/>
        }
        if(configButton === "Run Checker")
        {
            return <CheckerLogic
                selectedProtocol={selectedProtocol}
                serverName={serverName}
                port={port}
                endpoint={endpoint}
                requestNumber={requestNumber}/>
        }
    };


    return (
        <div className="Execution_block">
            {renderContent()}
        </div>
    )


}