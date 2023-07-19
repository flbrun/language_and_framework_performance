import React, {useEffect, useState} from "react";
import {RawDataTable} from "./RawDataTable";
import {RequestTimeline} from "./requestTimeline";
import {FetchInformations} from "./FetchInformations";
import {CpuLoad} from "./cpuLoad";
const { ipcRenderer } = window.require('electron');

export default function CheckerLogic({
                                         runChecker,
                                         setRunChecker,
                                         selectedProtocol,
                                         serverName,
                                         port,
                                         endpoint,
                                         requestNumber,
                                         isLoading,
                                         setIsLoading,
                                         method,
                                         testKind,
                                         parallel,
                                     }) {
    const [responses, setResponses] = useState([]);
    const [cpuLoad, setCpuLoad] = useState([]);
    const [showData, setShowData] = useState(false);


    useEffect(() => {
        if (runChecker && (requestNumber>0)) {
            setIsLoading(true);
            setShowData(false);
            const loadTestOptions = {
                selectedProtocol: selectedProtocol,
                serverName: serverName,
                port: port,
                endpoint: endpoint,
                requestNumber: requestNumber,
                cpuLoad: true,
            };

            ipcRenderer.send('startLoadTest', loadTestOptions);

            ipcRenderer.on('loadTestResults', (event, results) => {
                setResponses(results);
                setIsLoading(false);
                setShowData(true);
            });

            ipcRenderer.on('cpuLoad', (event, results) => {
                setCpuLoad(results);
            });

            setRunChecker(false);
        }
        else
        {
            setRunChecker(false);
        }

        return () => {
            ipcRenderer.removeAllListeners('script-contents');
        };
    }, [runChecker]);


    return (
        <div>
            {showData && responses.length > 0 &&(
                <div className="datafields">
                    <div className="dataTable">
                        <RawDataTable responses={responses} />
                    </div>
                    <div className="dataElement">
                        <RequestTimeline responses={responses} />
                    </div>
                    <div className="dataElement">
                        <FetchInformations responses={responses} />
                    </div>
                </div>
            )}
            {(!showData) && (
                <div></div>
            )}
                <CpuLoad cpuLoads={cpuLoad} isloading={isLoading} />
        </div>
    );
}