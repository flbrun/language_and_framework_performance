
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
    // const [scripts, setScripts] = useState([]);
    // const [selectedScript, setSelectedScript] = useState("");
    //
    // useEffect(() => {
    //     // Fetch the list of scripts from the server
    //     const fetchScripts = async () => {
    //         try {
    //             const response = await fetch("./scripts");
    //             const files = await response.json();
    //             const scriptFiles = files.filter((file) => file.startsWith("script-"));
    //             setScripts(scriptFiles);
    //         } catch (error) {
    //             console.error("Error fetching scripts:", error);
    //         }
    //     };
    //     fetchScripts();
    // }, []);
    // const handleScriptSelection = async (scriptName) => {
    //     setSelectedScript(scriptName);
    // }

        if (configButton === "Create Curl") {
            switch (testKind) {

            }
            return <p> {configButton}</p>
        }
    return <p>test</p>

}