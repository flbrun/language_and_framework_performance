

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

    const renderContent = () => {
        if (configButton === "Create Script") {
            return<FileLoader
                testKind={testKind}
                method={method}
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