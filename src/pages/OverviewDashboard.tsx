import { Container, Box, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { differenceInCalendarYears, getYear } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import urlcat from 'urlcat'
import CalculateExpense from '../components/Calculations/CalculateExpense'
import CalculateIncome from '../components/Calculations/CalculateIncome'
import UserDetailsContext from '../components/contextStore/userdetails-context'
import IncomeProjections from '../components/IncomeProjections'
import { IAssetData, IExpenseData, IIncomeData, ITotalExpenseProjection, ITotalIncomeProjection, ITotalSavingsProjection } from '../Interface'
import CSavingsLineChart from '../components/CSavingsLineChart'
import SavingsLineChart from '../components/SavingsLineChart'



const DashboardOverview = () => {


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

    const [expenseData, setExpensesData] = useState<IExpenseData[]>([{
        amount: 0,
        created_at: '',
        duration_months: 0,
        frequency: '',
        inflation_rate: 0,
        id: 0,
        expense_name: '',
        expense_status: '',
        expense_type: '',
        start_date: '',
        updated_at: '',
        user_details_id: 0,
    }])
    const [assetData, setAssetData] = useState<IAssetData[]>([{
        asset_name: '',
        asset_type: '',
        current_value: 0,
        id: 0,
        user_details_id: 0,
    }])



    const userContext = useContext(UserDetailsContext)

    const today = new Date
    const year = getYear(today)

    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userContext.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userContext.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userContext.life_expectancy - currentAge //66


    // FETCH
    const SERVER = import.meta.env.VITE_SERVER;
    const incomeUrl = urlcat(SERVER, "/income/");
    const expenseUrl = urlcat(SERVER, "/expense/");
    const assetUrl = urlcat(SERVER, "/asset/");
    const token = sessionStorage.getItem('token')
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    useEffect(() => {
        axios
            .get(incomeUrl, header)
            .then((res) => {
                console.log('income check', res.data)
                setIncomeData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));
        axios
            .get(expenseUrl, header)
            .then((res) => {
                setExpensesData(res.data)
                console.log(res.data)
            })
            .catch((error) => console.log(error.response.data.error));
        axios
            .get(assetUrl, header)
            .then((res) => {
                console.log(res.data)
                setAssetData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));
    }, [refresh])



    // INCOME
    const totalIncomeProjections = incomeData.map(income => CalculateIncome(income))

    // Sum all income for each age
    const incomeTimeline: ITotalIncomeProjection[] = []

    for (let age = currentAge; age <= userContext.life_expectancy; age++) {
        incomeTimeline.push({ "age": age, "totalIncome": 0 })
    }

    totalIncomeProjections.forEach((income) => {
        income.forEach((projection) => {
            incomeTimeline.find((entry) => entry.age === projection.age ? entry.totalIncome += projection.income : null)
        })
    })
    const slicedIncomeData = incomeTimeline.slice(0, 20)


    console.log('income', slicedIncomeData)


    // EXPENSE

    // Yearly projection for each expense

    const expenseProjections = expenseData.map(expense => CalculateExpense(expense))



    // Sum all expenses for each age
    const expenseTimeline: ITotalExpenseProjection[] = []


    for (let age = currentAge; age <= userContext.life_expectancy; age++) {
        expenseTimeline.push({ "age": age, "totalExpenses": 0 })
    }


    expenseProjections.forEach((expense) => {
        expense.forEach((projection) => {
            expenseTimeline.find((entry) => entry.age === projection.age ? entry.totalExpenses += projection.expense : null)
        })
    })

    const slicedExpenseData = expenseTimeline.slice(0, 20)
    console.log('expense', slicedExpenseData)


    // SAVINGS

    const savingsTimeline: ITotalSavingsProjection[] = []

    for (let age = currentAge; age <= userContext.life_expectancy; age++) {
        savingsTimeline.push({ "age": age, "totalSavings": 0 })
    }

    savingsTimeline.forEach((year) => {
        incomeTimeline.find((incomeYear) => incomeYear.age === year.age ? year.totalSavings = incomeYear.totalIncome : null)
    })

    savingsTimeline.forEach((year) => {
        expenseTimeline.find((expenseYear) => expenseYear.age === year.age ? year.totalSavings -= expenseYear.totalExpenses : null)
    })



    // FILTER SAVINGS FROM ASSETS
    const filteredSavings = assetData
        .filter(asset => asset.asset_type === 'Savings')
        .reduce((a, b) => a + b.current_value, 0)

    console.log('asset', filteredSavings)



    // CUMULATIVE SAVINGS
    const cumulativeSavings: ITotalSavingsProjection[] = []

    for (let age = currentAge; age <= userContext.life_expectancy; age++) {
        cumulativeSavings.push({ "age": age, "totalSavings": 0 })
    }

    // for (let count = 0; count <= userContext.life_expectancy- currentAge; count++) {
    //     savingsTimeline.every(year => )
    // }


    cumulativeSavings.forEach((savings) => {
        savingsTimeline.every((current) => current.age <= savings.age ? savings.totalSavings += current.totalSavings : null)
    })

    cumulativeSavings.forEach(savings => savings.totalSavings += filteredSavings)




    // FIGURES
    // This year savings
    const yearEndSavings = cumulativeSavings.find(savings => savings.age === currentAge)


    // Total Savings By Retirement Year 
    const totalSavingsByRetirement = cumulativeSavings.find(savings => savings.age === userContext.retirement_age)





    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' sx={{ mb: '3rem', color: '#53565B', fontWeight: '700' }}>Home</Typography>

            <Box sx={{ textAlign: 'center', mb: '5rem', mt: '3rem' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', mb: '2rem' }}>Annual Savings</Typography>
                <SavingsLineChart savingsProj={savingsTimeline} />
            </Box>

            <Box sx={{ textAlign: 'center', mb: '5rem', mt: '3rem' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', mb: '2rem' }}>Annual Cumulative Savings</Typography>
                <CSavingsLineChart cSavingsProj={cumulativeSavings} />
            </Box>



            <Typography variant='h4' sx={{ mb: '3rem', color: '#53565B' }}>Savings Estimates</Typography>
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
                        backgroundColor: '#EDEEF1',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Cumulative Savings By Year End Savings</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{yearEndSavings?.totalSavings.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#EDEEF1',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Cumulative Savings By Retirement</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + yearsToRetirement} (Age: {userContext.retirement_age})</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{totalSavingsByRetirement?.totalSavings.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
                {/* <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#FFE3CA',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{ mb: 3 }}>Debts</Typography>
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
                    <Typography variant="h5" sx={{ mb: 3 }}>Assets</Typography>
                </Grid> */}
            </Grid>


        </Container>
    )
}

export default DashboardOverview