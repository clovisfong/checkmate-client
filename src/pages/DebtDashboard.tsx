import { Container, Grid, Typography } from '@mui/material'
import { differenceInCalendarYears, getYear } from 'date-fns'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import urlcat from 'urlcat';
import { IDebtData, IExpenseData, IUserDetails } from '../Interface';
import ExpenseProjections from '../components/ExpenseProjections';
import ExpenseEntries from '../components/FinancialEntries/ExpenseEntries';
import DebtProjections from '../components/DebtProjections';
import jwt_decode from 'jwt-decode';


const DebtsDashboard = () => {

    const [refresh, setRefresh] = useState(false)
    const [debtData, setDebtData] = useState<IDebtData[]>([{
        commitment_period_months: 0,
        created_at: '',
        debt_name: '',
        debt_status: '',
        debt_type: '',
        id: 0,
        interest_rate: 0,
        loan_amount: 0,
        monthly_commitment: 0,
        start_date: '',
        updated_at: '',
    }])

    // Get Year
    const today = new Date
    const year = getYear(today)

    // Get User Details
    const token: any = sessionStorage.getItem("token");
    const userDetails: IUserDetails = jwt_decode(token)
    console.log(userDetails)

    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userDetails.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userDetails.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userDetails.life_expectancy - currentAge //66

    // Fetch Debt Details
    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/debt/");
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    useEffect(() => {
        axios
            .get(url, header)
            .then((res) => {
                setDebtData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));

    }, [refresh])


    // Yearly Annual Debt Details
    const repaymentProjectionByAge = DebtProjections(userDetails, debtData)

    // Current Year Annual Debt Details
    const currentYearRemainingRepayment = repaymentProjectionByAge.find((year) => year.age === currentAge)

    // Next Year Annual Debt Details
    const nextYearRepaymentDetails = repaymentProjectionByAge.find((year) => year.age === currentAge + 1)

    // Retirement Year Annual Debt Details
    const retirementYearRepaymentDetails = repaymentProjectionByAge.find((year) => year.age === currentAge + yearsToRetirement)

    // Total Debt Earned By Retirement Year
    const totalDebtByRetirement = repaymentProjectionByAge
        .filter((year) => year.age <= userDetails.retirement_age)
        .reduce((prev, curr) => prev + curr.totalDebt, 0)

    console.log(totalDebtByRetirement)


    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' sx={{ mb: '2rem', color: '#53565B', fontWeight: '700' }}>Debts</Typography>
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
                    <Typography variant="h5" sx={{}}>Remaining Repayment For This Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{currentYearRemainingRepayment?.totalDebt.toLocaleString('en-US', {
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
                    <Typography variant="h5" sx={{}}>Expected Annual Repayment Next Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + 1}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{nextYearRepaymentDetails?.totalDebt.toLocaleString('en-US', {
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
                    <Typography variant="h5" sx={{}}>Expected Anuual Repayment at Retirement Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + yearsToRetirement} (Age: {retirementYearRepaymentDetails?.age})</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{retirementYearRepaymentDetails?.totalDebt.toLocaleString('en-US', {
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
                    <Typography variant="h5" sx={{}}>Expected Total Future Repayment By Retirement Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + yearsToRetirement} (Age: {retirementYearRepaymentDetails?.age})</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{totalDebtByRetirement.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
            </Grid>
            <Typography variant='h4' sx={{ mb: '0.5rem', color: '#53565B' }}>Overview for Year {year}</Typography>

            {/* <ExpenseEntries expensesData={expensesData} update={update} /> */}
        </Container>
    )
}

export default DebtsDashboard