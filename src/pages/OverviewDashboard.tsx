import { Container, Box, Grid, Typography, Divider } from '@mui/material'
import axios from 'axios'
import { differenceInCalendarYears, getYear } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import urlcat from 'urlcat'
import CalculateExpense from '../components/Calculations/CalculateExpense'
import CalculateIncome from '../components/Calculations/CalculateIncome'
import UserDetailsContext from '../components/contextStore/userdetails-context'
import IncomeProjections from '../components/IncomeProjections'
import { IAssetData, IDebtData, IExpenseData, IIncomeData, ITotalDebtProjection, ITotalExpenseProjection, ITotalIncomeProjection, ITotalSavingsProjection } from '../Interface'
import CSavingsLineChart from '../components/CSavingsLineChart'
import SavingsLineChart from '../components/SavingsLineChart'
import CalculateDebt from '../components/Calculations/CalculateDebt'



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
        user_details_id: 0
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
    const retirementSpendingRate = userContext.retirement_lifestyle
    const retirementAge = userContext.retirement_age


    // FETCH
    const SERVER = import.meta.env.VITE_SERVER;
    const incomeUrl = urlcat(SERVER, "/income/");
    const expenseUrl = urlcat(SERVER, "/expense/");
    const debtUrl = urlcat(SERVER, "/debt/");
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
                setIncomeData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));
        axios
            .get(expenseUrl, header)
            .then((res) => {
                setExpensesData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));
        axios
            .get(debtUrl, header)
            .then((res) => {
                setDebtData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));
        axios
            .get(assetUrl, header)
            .then((res) => {
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

    // Adjust expense based on retirement lifestyle
    expenseTimeline.forEach(entry => {
        if (entry.age <= retirementAge) null
        else {
            retirementSpendingRate === 'Simple' ? entry.totalExpenses *= 0.8 :
                retirementSpendingRate === 'Enhanced' ? entry.totalExpenses *= 1.5 :
                    null
        }
    })



    // DEBT

    // Yearly projection for each debt
    const debtProjections = debtData.map(debt => CalculateDebt(debt))


    // Sum all debts for each age
    const debtTimeline: ITotalDebtProjection[] = []

    for (let age = currentAge; age <= userContext.life_expectancy; age++) {
        debtTimeline.push({ "age": age, "yearlyRepayment": 0, "principalRepayment": 0, "interestRepayment": 0, "outstandingPrincipal": 0 })
    }

    debtProjections.forEach((debt) => {
        debt.forEach((projection) => {
            debtTimeline.find((entry) => entry.age === projection.age ? entry.yearlyRepayment += projection.yearlyRepayment : null)
        })
        debt.forEach((projection) => {
            debtTimeline.find((entry) => entry.age === projection.age ? entry.principalRepayment += projection.principalRepayment : null)
        })
        debt.forEach((projection) => {
            debtTimeline.find((entry) => entry.age === projection.age ? entry.interestRepayment += projection.interestRepayment : null)
        })
        debt.forEach((projection) => {
            debtTimeline.find((entry) => entry.age === projection.age ? entry.outstandingPrincipal += projection.outstandingPrincipal : null)
        })

    })





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

    savingsTimeline.forEach((year) => {
        debtTimeline.find((debtYear) => debtYear.age === year.age ? year.totalSavings -= debtYear.yearlyRepayment : null)
    })



    // FILTER SAVINGS FROM ASSETS
    const filteredSavings = assetData
        .filter(asset => asset.asset_type === 'Savings')
        .reduce((a, b) => a + b.current_value, 0)





    // CUMULATIVE SAVINGS
    const cumulativeSavings: ITotalSavingsProjection[] = []

    for (let age = currentAge; age <= userContext.life_expectancy; age++) {
        cumulativeSavings.push({ "age": age, "totalSavings": 0 })
    }


    cumulativeSavings.forEach((savings) => {
        savingsTimeline.every((current) => current.age <= savings.age ? savings.totalSavings += current.totalSavings : null)
    })

    cumulativeSavings.forEach(savings => savings.totalSavings += filteredSavings)





    // FIGURES
    // This year savings
    const yearEndSavings = cumulativeSavings.find(savings => savings.age === currentAge)


    // Total Savings By Retirement Year 
    const totalSavingsByRetirement = cumulativeSavings.find(savings => savings.age === userContext.retirement_age)


    // Total Savings by Expectancy year
    const totalSavingsByExpectancy = cumulativeSavings.find(savings => savings.age === userContext.life_expectancy)


    // Monthly retirement budget
    let monthlyRetirementBudget = 0
    if (totalSavingsByRetirement) {
        const retirementSavingsAfterEstate = totalSavingsByRetirement?.totalSavings - userContext.legacy_allocation
        monthlyRetirementBudget = retirementSavingsAfterEstate / ((userContext.life_expectancy - userContext.retirement_age) * 12)
    }

    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' sx={{ mb: '3rem', color: '#53565B', fontWeight: '700' }}>Home</Typography>

            <Box sx={{ textAlign: 'center', mb: '5rem', mt: '3rem' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', mb: '2rem' }}>Annual Cumulative Savings</Typography>
                <CSavingsLineChart cSavingsProj={cumulativeSavings} />
            </Box>

            <Box sx={{ textAlign: 'center', mb: '5rem', mt: '3rem' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', mb: '2rem' }}>Annual Savings</Typography>
                <SavingsLineChart savingsProj={savingsTimeline} />
            </Box>



            <Typography variant='h5' sx={{ mb: '0.5rem', color: '#53565B' }}>Savings Details</Typography>
            <Divider sx={{ mt: '1rem', mb: '2rem' }}></Divider>
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
                    <Typography variant="h5" sx={{}}>Cumulative Savings By Year End</Typography>
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

                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#EDEEF1',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Estate Savings For Loved Ones</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>Based on '{userContext.retirement_lifestyle}' lifestyle for retirement (Age: {userContext.life_expectancy})</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{totalSavingsByExpectancy?.totalSavings.toLocaleString('en-US', {
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
                    <Typography variant="h5" sx={{}}>Monthly Retirement Budget</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>Based on {userContext.legacy_allocation.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })} estate savings</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{monthlyRetirementBudget.toLocaleString('en-US', {
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

            <Box sx={{ mt: '10rem' }}></Box>
        </Container>
    )
}

export default DashboardOverview