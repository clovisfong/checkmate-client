import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { differenceInCalendarYears, getYear } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import IncomeEntries from '../components/FinancialEntries/IncomeEntries'
import axios from 'axios';
import urlcat from 'urlcat';
import { IAssetData, IUserDetails } from '../Interface';
import CalculateIncome from '../components/Calculations/CalculateIncome';
import IncomeProjections from '../components/IncomeProjections';
import jwt_decode from 'jwt-decode';
import AssetEntries from '../components/FinancialEntries/AssetEntries';
import UserDetailsContext from '../components/contextStore/userdetails-context';
import AssetPieChart from '../components/AssetPieChart';

const AssetsDashboard = () => {

    const [refresh, setRefresh] = useState(false)
    const [assetData, setAssetData] = useState<IAssetData[]>([{
        asset_name: '',
        asset_type: '',
        current_value: 0,
        id: 0,
        user_details_id: 0,
    }])

    // Get Year
    const today = new Date
    const year = getYear(today)

    // Get User Details
    const userContext = useContext(UserDetailsContext)

    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userContext.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userContext.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userContext.life_expectancy - currentAge //66

    // Fetch Asset Details
    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/asset/");
    const token = sessionStorage.getItem('token')
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    useEffect(() => {
        axios
            .get(url, header)
            .then((res) => {
                console.log(res.data)
                setAssetData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));

    }, [refresh])


    // Total asset current value
    const totalAssetValue = assetData.reduce((prev, curr) => prev + curr.current_value, 0)

    const sortAssetbyValue = assetData.sort((a, b) => b.current_value - a.current_value)

    // Total savings
    const totalSavings = assetData.filter(asset => asset.asset_type === 'Savings').reduce((prev, cur) => prev + cur.current_value, 0)


    const update = () => {
        setRefresh(!refresh)
    }

    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' sx={{ mb: '2rem', color: '#53565B', fontWeight: '700' }}>Assets</Typography>
            <Box sx={{ textAlign: 'center', mb: '2rem', mt: '3rem' }}>
                <Typography variant="h5" sx={{ textAlign: 'left' }}>Asset Details</Typography>
                <Divider sx={{ mt: '1rem', mb: '2rem' }}></Divider>

            </Box>
            <Grid container spacing={0}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '3fr 3fr' },
                    columnGap: '2rem',
                    rowGap: '2rem',
                    mb: 7
                }}
            >


                <Grid container sx={{ gap: '1rem' }}>
                    <Grid
                        item xs={12}
                        sx={{
                            backgroundColor: '#E4EFFF',
                            p: '1rem',
                            pl: '2rem',
                            pr: '2rem',
                            borderRadius: '0.75rem'
                        }}>
                        <Typography variant="h5" sx={{}}>Total Asset Value</Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>As at {year}</Typography>
                        <Typography variant="h3" sx={{ mb: 3 }}>{totalAssetValue.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'SGD',
                            maximumFractionDigits: 0,
                        })}</Typography>
                    </Grid>


                    <Grid
                        item xs={12}
                        sx={{
                            backgroundColor: '#E4EFFF',
                            p: '1rem',
                            pl: '2rem',
                            pr: '2rem',
                            borderRadius: '0.75rem'
                        }}>
                        <Typography variant="h5" sx={{}}>Total Initial Savings</Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>As of Now</Typography>
                        <Typography variant="h3" sx={{ mb: 3 }}>{totalSavings.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'SGD',
                            maximumFractionDigits: 0,
                        })}</Typography>
                    </Grid>
                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#E4EFFF',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>Assets Breakdown</Typography>

                    <AssetPieChart assetData={assetData} />

                </Grid>




            </Grid>
            <Typography variant='h5' sx={{ mb: '0.5rem', color: '#53565B' }}>Types of Assets</Typography>

            <AssetEntries assetData={assetData} update={update} />
            <Box sx={{ mt: '10rem' }}></Box>
        </Container>
    )
}

export default AssetsDashboard