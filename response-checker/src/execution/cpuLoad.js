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
                    responsive: false,
                    animation: false,
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
            let randomColorsBackground = [];
            cpuLoads.forEach((cpuLoad, index) => {
                randomColors[index] = randomColor({luminosity: 'light', format: 'rgba', alpha: 1 });
                randomColorsBackground[index] = randomColors[index].replace(/[\d.]+\)$/g, 0.3 + ')');

                if (index < chartRef.current.data.datasets.length) {
                    const dataset = chartRef.current.data.datasets[index];
                    dataset.data.push(cpuLoad);

                    if (dataset.data.length > 25) {
                        dataset.data.shift();
                    }
                } else {
                }
            });

            if (chartRef.current.data.datasets.length < cpuLoads.length) {
                for (let i = chartRef.current.data.datasets.length; i < cpuLoads.length; i++) {

                    const newDataset = {
                        label: `CPU ${i + 1} Load`,
                        data: [cpuLoads[i]],
                        borderWidth: i === 0 ? 3 : 1,
                        fill: true,
                         backgroundColor: i ===0 ? 'rgba(217, 30, 24, 0.3)': randomColorsBackground[i],
                        borderColor: i ===0 ? 'rgba(217, 30, 24, 1)': randomColors[i],
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

