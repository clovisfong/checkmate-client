import { differenceInCalendarYears, getYear } from "date-fns"
import { useContext } from "react"
import { IExpenseData, ITotalExpenseProjection, IUserDetails } from "../Interface"
import CalculateExpense from "./Calculations/CalculateExpense"
import UserDetailsContext from "./contextStore/userdetails-context"
import { Box, Container, Grid, Typography } from '@mui/material'
import { Line } from '@ant-design/plots';

interface Props {
    expenseData: IExpenseData[];
}


const ExpenseProjections = ({ expenseData }: Props) => {

    const userContext = useContext(UserDetailsContext)

    // Get Year
    const today = new Date
    const year = getYear(today)

    // General details: Current age, retirement age, life-expectancy age
    const birthDate = new Date(userContext.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userContext.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userContext.life_expectancy - currentAge //66


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
    console.log(expenseTimeline)

    const data = expenseTimeline.slice(0, 20)


    const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'age',
        yField: 'totalExpenses',
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




    // Current Year Annual Expense Details
    const currentYearRemainingExpenses = expenseTimeline.find((year) => year.age === currentAge)

    // Next Year Annual Expense Details
    const nextYearExpensesDetails = expenseTimeline.find((year) => year.age === currentAge + 1)

    // Retirement Year Annual Expense Details
    const retirementYearExpensesDetails = expenseTimeline.find((year) => year.age === currentAge + yearsToRetirement)

    // Total Expense Earned By Retirement Year
    const totalExpensesByRetirement = expenseTimeline
        .filter((year) => year.age <= userContext.retirement_age)
        .reduce((prev, curr) => prev + curr.totalExpenses, 0)



    return (
        <>
            <Box sx={{ textAlign: 'center', mb: '5rem', mt: '3rem' }}>
                <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
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
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#F9E0DB',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Remaining Expenses For This Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{currentYearRemainingExpenses?.totalExpenses.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#F9E0DB',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Annual Expenses Next Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + 1}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{nextYearExpensesDetails?.totalExpenses.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#F9E0DB',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Annual Expenses at Retirement Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + yearsToRetirement} (Age: {retirementYearExpensesDetails?.age})</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{retirementYearExpensesDetails?.totalExpenses.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#F9E0DB',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Total Future Expenses By Retirement Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + yearsToRetirement} (Age: {retirementYearExpensesDetails?.age})</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{totalExpensesByRetirement.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
            </Grid>
        </>

    )
}

export default ExpenseProjections