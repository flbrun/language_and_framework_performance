import {useEffect, useRef, useState} from "react";
import {CategoryScale, Chart, LinearScale} from "chart.js";
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';

Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);
export const FetchInformations = ({responses}) =>
{
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [minTime, setMinTime] = useState(0);
    const [maxTime, setMaxTime] = useState(0);
    const [sumTime, setSumTime] = useState(0);
    const [avgTime, setAvgTime] = useState(0);


    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
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
            setSumTime(tempSumTime.toFixed(2));
            setMaxTime(tempMaxTime);
            setMinTime(tempMinTime);

            const chartConfig = {
                type: 'boxplot',
                data: {
                    labels: ["",],
                    datasets: [
                        {
                            label: "Dataset 1",
                            backgroundColor: "rgba(53, 162, 235, 0.5)",
                            borderColor: "rgb(53, 162, 235)",
                            borderWidth: 1,
                            outlierColor: "#000000",
                            padding: 10,
                            itemRadius: 0,
                            data: [
                                responses.map ((response)=> response.duration)
                            ]
                        },
                    ],
                },
                options: {
                    responsive: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: false,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Response Time (ms)',
                            },
                        },
                    },
                },
            };

            chartInstanceRef.current = new Chart(chartRef.current, chartConfig);

        }else {

            setAvgTime(NaN);
            setSumTime(NaN);
            setMaxTime(NaN);
            setMinTime(NaN);
        }

    }, [responses]);

    return (
        <div style={{width: 500}}>
            {/*<div style={{marginLeft: 40, marginTop: 35}}>*/}
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'auto auto', marginLeft: 40, marginTop: 35 }}>
                <li><strong>Average time:</strong></li>
                <li>{avgTime.toFixed(2)} ms</li>
                <li><strong>Minimum response time:</strong></li>
                <li>{minTime} ms</li>
                <li><strong>Maximum response time:</strong></li>
                <li>{maxTime} ms</li>
                <li><strong>Total response time:</strong></li>
                <li>{sumTime} ms</li>
            </ul>
            {/*</div>*/}
            <div style={{marginLeft: 150, marginTop: 40}}>
                <canvas  className="responseTimeLine" ref={chartRef} width={200} height={300} />
            </div>
        </div>
    );
}