import { useEffect, useRef, useState } from "react";
import { CategoryScale, Chart as ChartJS, LinearScale } from "chart.js";
import { BoxPlotController, BoxAndWiskers } from "@sgratzl/chartjs-chart-boxplot";

ChartJS.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);

export const FetchInformations = ({ responses }) => {
    const chartRef = useRef(null);

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
            setSumTime(tempSumTime.toFixed(2));
            setMaxTime(tempMaxTime);
            setMinTime(tempMinTime);

            if (chartRef.current) {
                chartRef.current.destroy(); // Destroy the previous chart instance if it exists
            }

            chartRef.current = new ChartJS("fetchChart", {
                type: "boxplot",
                data: {
                    labels: ["Dataset 1"], // Add label for the dataset
                    datasets: [
                        {
                            label: "Dataset 1",
                            backgroundColor: "rgba(53, 162, 235, 0.5)",
                            borderColor: "rgb(53, 162, 235)",
                            borderWidth: 1,
                            outlierColor: "#000000",
                            padding: 10,
                            itemRadius: 0,
                            data: responses.map((response) => parseFloat(response.duration)), // Pass an array of numerical durations
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
                                text: "Response Time (ms)",
                            },
                        },
                    },
                },
            });
        }
    }, [responses]);

    return (
        <div style={{ width: 500 }}>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                    marginLeft: 40,
                    marginTop: 35,
                }}
            >
                <li>
                    <strong>Average time:</strong>
                </li>
                <li>{avgTime.toFixed(2)} ms</li>
                <li>
                    <strong>Minimum response time:</strong>
                </li>
                <li>{minTime} ms</li>
                <li>
                    <strong>Maximum response time:</strong>
                </li>
                <li>{maxTime} ms</li>
                <li>
                    <strong>Total response time:</strong>
                </li>
                <li>{sumTime} ms</li>
            </ul>
            <div style={{ marginLeft: 150, marginTop: 40 }}>
                <canvas className="responseTimeLine" id="fetchChart" width={200} height={300} />
            </div>
        </div>
    );
};
