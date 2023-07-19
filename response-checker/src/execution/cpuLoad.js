import { useEffect, useRef } from "react";
import randomColor from 'randomcolor';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    registerables,
    Title,
    Tooltip,
    Legend,
    Chart,
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

export const CpuLoad = ({ cpuLoads, isloading }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = document.getElementById('cpuChart');

        if (!chartRef.current) {
            chartRef.current = new ChartJS(ctx, {
                type: 'line',
                data: {
                    labels: Array(25).fill(''),
                    datasets: []
                },
                options: {
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: false,
                    },
                    elements: {
                        line: {
                            cubicInterpolationMode: 'monotone',
                        },
                    },
                }
            });
        }

        const updateChart = () => {
            let randomColors = [];
            cpuLoads.forEach((cpuLoad, index) => {
                randomColors[index] = randomColor();
                if (index < chartRef.current.data.datasets.length) {
                    const dataset = chartRef.current.data.datasets[index];
                    dataset.data.push(cpuLoad);

                    if (dataset.data.length > 25) {
                        dataset.data.shift();
                    }
                } else {
                    // This block of code should be moved outside the forEach loop
                }
            });

            // Add new datasets outside the forEach loop
            if (chartRef.current.data.datasets.length < cpuLoads.length) {
                for (let i = chartRef.current.data.datasets.length; i < cpuLoads.length; i++) {
                    const newDataset = {
                        label: `CPU ${i + 1} Load`,
                        data: [cpuLoads[i]],
                        borderWidth: 1,
                        borderColor: randomColors[i],
                        pointRadius: 0,
                    };
                    chartRef.current.data.datasets.push(newDataset);
                }
            }

            chartRef.current.update();
        };

        if (isloading) {
            updateChart();
            const interval = setInterval(updateChart, 500);

            return () => {
                clearInterval(interval);
            };
        }
    }, [cpuLoads, isloading]);

    return (
        <div className="cpuLoadElement">
            <canvas id="cpuChart" />
        </div>
    );
};

