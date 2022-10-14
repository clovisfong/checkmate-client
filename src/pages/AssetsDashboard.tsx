import { Container, Grid, Typography } from '@mui/material'
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


    const totalAssetValue = assetData.reduce((prev, curr) => prev + curr.current_value, 0)

    const sortAssetbyValue = assetData.sort((a, b) => b.current_value - a.current_value)


    const update = () => {
        setRefresh(!refresh)
    }

    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' sx={{ mb: '2rem', color: '#53565B', fontWeight: '700' }}>Assets</Typography>
            <Grid container spacing={0}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '3fr 3fr' },
                    columnGap: '2rem',
                    rowGap: '2rem',
                    mb: 7
                }}
            >
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#E4EFFF',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Asset Current Value</Typography>
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
                    <Typography variant="h5" sx={{}}>Top 3 Assets</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year}</Typography>
                    {sortAssetbyValue.slice(0, 3).map((asset) =>
                        <Typography key={asset.id} variant="h4" sx={{ mb: 2 }}> {asset.asset_name}:  {asset.current_value.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'SGD',
                            maximumFractionDigits: 0,
                        })}</Typography>)}

                </Grid>


            </Grid>
            <Typography variant='h4' sx={{ mb: '0.5rem', color: '#53565B' }}>Asset Entries</Typography>

            <AssetEntries assetData={assetData} update={update} />
        </Container>
    )
}

export default AssetsDashboard