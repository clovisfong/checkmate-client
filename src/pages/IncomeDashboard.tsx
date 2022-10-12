import { Container, Grid, Typography } from '@mui/material'
import { differenceInCalendarYears, getYear } from 'date-fns'
import React, { useEffect, useState } from 'react'
import IncomeEntries from '../components/FinancialEntries/IncomeEntries'
import axios from 'axios';
import urlcat from 'urlcat';
import { IIncomeData } from '../Interface';
import CalculateIncome from '../components/Calculations/CalculateIncome';
import IncomeProjections from '../components/IncomeProjections';

const parseJwt = (token: string) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
};

const IncomeDashboard = () => {

    const [refresh, setRefresh] = useState(false)
    const [incomeData, setIncomeData] = useState<IIncomeData[]>([{
        amount: 0,
        created_at: '',
        duration_months: 0,
        frequency: '',
        growth_rate: 0,
        id: 0,
        income_name: '',
        income_status: '',
        income_type: '',
        start_date: '',
        updated_at: '',
        user_details_id: 0,
    }])

    // Get Year
    const today = new Date
    const year = getYear(today)

    // Get User Details
    const token: any = sessionStorage.getItem("token");
    const userDetails = parseJwt(token)
    console.log(userDetails)

    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userDetails.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userDetails.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userDetails.life_expectancy - currentAge //66


    // Fetch Income Details
    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/income/");
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    useEffect(() => {
        axios
            .get(url, header)
            .then((res) => {
                setIncomeData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));

    }, [refresh])


    // Yearly Annual Income Details
    const IncomeProjectionByAge = IncomeProjections(userDetails, incomeData)

    // Current Year Annual Income Details
    const currentYearRemainingIncome = IncomeProjectionByAge.find((year) => year.age === currentAge)

    // Next Year Annual Income Details
    const nextYearIncomeDetails = IncomeProjectionByAge.find((year) => year.age === currentAge + 1)

    // Retirement Year Annual Income Details
    const retirementYearIncomeDetails = IncomeProjectionByAge.find((year) => year.age === currentAge + yearsToRetirement)

    // Total Income Earned By Retirement Year
    const totalIncomeByRetirement = IncomeProjectionByAge
        .filter((year) => year.age <= userDetails.retirement_age)
        .reduce((prev, curr) => prev + curr.totalIncome, 0)
    console.log('heyyyy', totalIncomeByRetirement)



    const update = () => {
        setRefresh(!refresh)
    }


    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' sx={{ mb: '2rem', color: '#53565B', fontWeight: '700' }}>Income</Typography>
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
                    <Typography variant="h5" sx={{}}>Remaining Income For This Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{currentYearRemainingIncome?.totalIncome.toLocaleString('en-US', {
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
                    <Typography variant="h5" sx={{}}>Expected Annual Income Next Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + 1}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{nextYearIncomeDetails?.totalIncome.toLocaleString('en-US', {
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
                    <Typography variant="h5" sx={{}}>Expected Anuual Income at Retirement Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + yearsToRetirement} (Age: {retirementYearIncomeDetails?.age})</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{retirementYearIncomeDetails?.totalIncome.toLocaleString('en-US', {
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
                    <Typography variant="h5" sx={{}}>Expected Total Income To Earn By Retirement Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + yearsToRetirement} (Age: {retirementYearIncomeDetails?.age})</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{totalIncomeByRetirement.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
            </Grid>
            <Typography variant='h4' sx={{ mb: '0.5rem', color: '#53565B' }}>Overview for Year {year}</Typography>

            <IncomeEntries incomeData={incomeData} update={update} />
        </Container>
    )
}

export default IncomeDashboard