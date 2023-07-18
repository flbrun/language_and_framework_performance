import {useEffect, useRef, useState} from "react";

export const FetchInformations = ({responses}) =>
{
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [minTime, setMinTime] = useState(0);
    const [maxTime, setMaxTime] = useState(0);
    const [sumTime, setSumTime] = useState(0);
    const [avgTime, setAvgTime] = useState(0);

    useEffect(() => {
        if (responses && responses.length > 0) {
            let tempMinTime = 999999999999;
            let tempMaxTime = 0;
            let tempSumTime = 0;

            responses.forEach((response) => {
                const duration = parseFloat(response.duration);

                tempSumTime += duration;

                if (duration < tempMinTime) {
                    tempMinTime = duration;
                }
                if (duration > tempMaxTime) {
                    tempMaxTime = duration;
                }
            });

            setAvgTime(tempSumTime / responses.length);
            setSumTime(tempSumTime);
            setMaxTime(tempMaxTime);
            setMinTime(tempMinTime);
        } else {

            setAvgTime(NaN);
            setSumTime(NaN);
            setMaxTime(NaN);
            setMinTime(NaN);
        }
    }, [responses]);

    return (
        <div>
            <p>Average time taken : {avgTime.toFixed(2)} ms<br/></p>
            <p>Minimal response time: {minTime} ms<br/></p>
            <p>Maximal response time: {maxTime} ms<br/></p>
            <p>Response time in sum : {sumTime} ms<br/></p>
        </div>)
}