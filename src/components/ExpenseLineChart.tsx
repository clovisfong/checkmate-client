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
import { ITotalExpenseProjection } from '../Interface';

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
    expenseProj: ITotalExpenseProjection[];
}


const ExpenseLineChart = ({ expenseProj }: Props) => {


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    const labels = expenseProj.map(data => data.age);

    const data = {
        labels,
        datasets: [{
            label: 'Annual Total Expense (SGD)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: expenseProj.map(data => data.totalExpenses),
        }]
    };

    return (
        <>

            <Line options={options} data={data} />

        </>


    )
}

export default ExpenseLineChart