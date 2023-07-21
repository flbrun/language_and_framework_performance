import ScriptLoader from "./ScriptLoader";
import CheckerLogic from "./CheckerLogic";

export default function ExecutionBlock({
           runChecker,
           setRunChecker,
           setIsLoading,
           isLoading,
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
                testKind={testKind}
                parallel={parallel}
                runChecker={runChecker}
                setRunChecker={setRunChecker}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
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
