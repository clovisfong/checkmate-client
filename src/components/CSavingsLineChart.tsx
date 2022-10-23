import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ITotalSavingsProjection } from '../Interface';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


interface Props {
    cSavingsProj: ITotalSavingsProjection[];
}

const CSavingsLineChart = ({ cSavingsProj }: Props) => {


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    const labels = cSavingsProj.map(data => data.age);

    const data = {
        labels,
        datasets: [{
            label: 'Annual Cumulative Savings (SGD)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: cSavingsProj.map(data => data.totalSavings),
            // pointHoverBackgroundColor: 'rgb(255, 345, 132)'
        }]
    };



    return (
        <>
            <Line options={options} data={data} />
        </>
    )
}

export default CSavingsLineChart