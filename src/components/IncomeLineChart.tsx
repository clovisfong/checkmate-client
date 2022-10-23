import React from 'react';
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
import { ITotalIncomeProjection } from '../Interface';

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
    incomeProj: ITotalIncomeProjection[];
}


const IncomeLineChart = ({ incomeProj }: Props) => {


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            // title: {
            //     display: true,
            //     text: 'Chart.js Line Chart',
            // },
        },
    };

    const labels = incomeProj.map(data => data.age);

    const data = {
        labels,
        datasets: [{
            label: 'Annual Total Income (SGD)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: incomeProj.map(data => data.totalIncome),
            // pointHoverBackgroundColor: 'rgb(255, 345, 132)'
        }]
    };

    return (
        <>

            <Line options={options} data={data} />

        </>


    )
}

export default IncomeLineChart