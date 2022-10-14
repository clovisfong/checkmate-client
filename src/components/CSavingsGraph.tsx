import React from 'react'
import { Line } from '@ant-design/plots';
import { ITotalSavingsProjection } from '../Interface';

interface Props {
    data: ITotalSavingsProjection[];
}

const CSavingsGraph = ({ data }: Props) => {


    const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'age',
        yField: 'totalSavings',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    let chart: any;

    return (
        <>
            <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        </>
    )
}

export default CSavingsGraph