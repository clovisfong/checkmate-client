import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { differenceInCalendarYears, getYear } from "date-fns"
import { useContext } from "react"
import { IIncomeData, IIncomeProjection, ITotalIncomeProjection, IUserDetails } from "../Interface"
import CalculateIncome from "./Calculations/CalculateIncome"
import UserDetailsContext from "./contextStore/userdetails-context"
import IncomeLineChart from "./IncomeLineChart"

interface Props {
    incomeData: IIncomeData[];
}

const IncomeProjections = ({ incomeData }: Props) => {




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


    // Yearly projection for each income
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



    // Current Year Annual Income Details
    const currentYearRemainingIncome = incomeTimeline.find((year) => year.age === currentAge)

    // Next Year Annual Income Details
    const nextYearIncomeDetails = incomeTimeline.find((year) => year.age === currentAge + 1)

    // Retirement Year Annual Income Details
    const retirementYearIncomeDetails = incomeTimeline.find((year) => year.age === currentAge + yearsToRetirement)

    // Total Income Earned By Retirement Year
    const totalIncomeByRetirement = incomeTimeline
        .filter((year) => year.age <= userContext.retirement_age)
        .reduce((prev, curr) => prev + curr.totalIncome, 0)



    return (
        <>
            <Box sx={{ textAlign: 'center', mb: '5rem', mt: '3rem' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', mb: '2rem' }}>Annual Income To Be Earned</Typography>
                <IncomeLineChart incomeProj={incomeTimeline} />
            </Box>

            <Typography variant='h5' sx={{ mt: '2rem', mb: '0.5rem', color: '#53565B' }}>Income Details</Typography>
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
                        backgroundColor: '#D7F0DD',
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
                        backgroundColor: '#D7F0DD',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Annual Income Next Year</Typography>
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
                        backgroundColor: '#D7F0DD',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Annual Income at Retirement Year</Typography>
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
                        backgroundColor: '#D7F0DD',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Total Future Income By Retirement Year</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + yearsToRetirement} (Age: {retirementYearIncomeDetails?.age})</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{totalIncomeByRetirement.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
            </Grid>
        </>

    )
}

export default IncomeProjections