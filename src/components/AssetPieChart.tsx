import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IAssetData } from '../Interface';
import { Box } from '@mui/system';

ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
    assetData: IAssetData[];
}


const AssetPieChart = ({ assetData }: Props) => {

    const assetbyHighestValue = assetData.sort((a, b) => b.current_value - a.current_value)
    const labels = assetbyHighestValue.map(asset => asset.asset_name)

    const data = {
        labels,
        datasets: [
            {
                data: assetbyHighestValue.map(asset => asset.current_value),
                backgroundColor: [
                    '#284455',
                    '#3E6074',
                    '#628196',
                    '#E4B485',
                    '#EDCBA9',
                    '#F1D7BD',
                ],
                borderColor: [
                    '#284455',
                    '#3E6074',
                    '#628196',
                    '#E4B485',
                    '#EDCBA9',
                    '#F1D7BD',
                ],
                borderWidth: 1,
                hoverOffset: 4,

            },
        ],
    };



    return (
        <Box>
            <Doughnut data={data} height="250px"
                width="250px"
                options={{ maintainAspectRatio: false }} />
        </Box>
    )
}


export default AssetPieChart