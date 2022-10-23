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
import { ITotalDebtProjection, ITotalExpenseProjection } from '../Interface';

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
    debtProj: ITotalDebtProjection[];
}


const DebtRepaymentLineChart = ({ debtProj }: Props) => {


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    const labels = debtProj.map(data => data.age);

    const data = {
        labels,
        datasets: [{
            label: 'Annual Debt Repayment (SGD)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: debtProj.map(data => data.totalDebtRepayment),
        }]
    };

    return (
        <>

            <Line options={options} data={data} />

        </>


    )
}

export default DebtRepaymentLineChart