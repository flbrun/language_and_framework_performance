import {useEffect, useRef, useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    registerables,
    Title,
    Tooltip,
    Legend, Chart,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    ...registerables,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const RequestTimeline = ({ responses }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [dataSet, setDataSet] = useState([]);

    useEffect(() => {

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        if (chartRef.current) {
            const data = responses.map((response, index) => ({ x: index, y: response.duration }));
            const chartConfig = {
                type: 'line',
                data: {
                    datasets: [
                        {
                            data: data,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            pointRadius: 0,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            title: {
                                display: true,
                                text: 'Request Number',
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
        }
    }, [responses]);


    return (<canvas  className="responseTimeLine" ref={chartRef} width={500} height={500} />);
};






