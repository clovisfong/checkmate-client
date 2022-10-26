import { differenceInCalendarYears, getYear } from "date-fns"
import { useContext, useEffect, useState } from "react"
import { IDebtData, ITotalDebtProjection, IUserDetails } from "../Interface"
import CalculateDebt from "./Calculations/CalculateDebt"
import UserDetailsContext from "./contextStore/userdetails-context"
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import urlcat from "urlcat"
import axios from "axios"
import DebtRepaymentLineChart from "./DebtRepaymentLineChart"
import DebtOutstandingLineChart from "./DebtOutstandingLineChart"

interface Props {
    debtData: IDebtData[];
}


const DebtProjections = ({ debtData }: Props) => {


    // Get Year
    const today = new Date
    const year = getYear(today)

    // User details
    const userContext = useContext(UserDetailsContext)
    const birthDate = new Date(userContext.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
    const yearsToRetirement = userContext.retirement_age - currentAge //42
    const yearsToLifeExpectancy = userContext.life_expectancy - currentAge //66


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



    // Total Current Loan Amount
    const totalLoanAmount = debtData.filter(debt => debt.debt_status === 'Current').reduce((prev, curr) => prev + curr.loan_amount, 0)


    // Current Debt Projections

    const currentDebtProjections = debtData.filter(debt => debt.debt_status === 'Current').map(debt => CalculateDebt(debt))
    const currentDebtTimeline: ITotalDebtProjection[] = []

    for (let age = currentAge; age <= userContext.life_expectancy; age++) {
        currentDebtTimeline.push({ "age": age, "yearlyRepayment": 0, "principalRepayment": 0, "interestRepayment": 0, "outstandingPrincipal": 0 })
    }

    currentDebtProjections.forEach((debt) => {
        debt.forEach((projection) => {
            currentDebtTimeline.find((entry) => entry.age === projection.age ? entry.yearlyRepayment += projection.yearlyRepayment : null)
        })
        debt.forEach((projection) => {
            currentDebtTimeline.find((entry) => entry.age === projection.age ? entry.principalRepayment += projection.principalRepayment : null)
        })
        debt.forEach((projection) => {
            currentDebtTimeline.find((entry) => entry.age === projection.age ? entry.interestRepayment += projection.interestRepayment : null)
        })
        debt.forEach((projection) => {
            currentDebtTimeline.find((entry) => entry.age === projection.age ? entry.outstandingPrincipal += projection.outstandingPrincipal : null)
        })

    })

    // Total current debt oustanding
    let totalCurrentDebtOutstanding = 0
    const currentYearDebtDetails = currentDebtTimeline.find((year) => year.age === currentAge)
    if (currentYearDebtDetails) {
        totalCurrentDebtOutstanding = currentYearDebtDetails.outstandingPrincipal + currentYearDebtDetails.principalRepayment
    }

    // Total outstanding interest
    const totalInterestOutstanding = currentDebtTimeline.reduce((prev, curr) => prev + curr.interestRepayment, 0)


    // Debt free age
    let debtFreeAge = 0
    const debtFreeDetails = currentDebtTimeline.find(entry => entry.yearlyRepayment === 0)
    if (debtFreeDetails) {
        debtFreeAge = debtFreeDetails.age
    }





    return (
        <>
            <Box sx={{ textAlign: 'center', mb: '5rem', mt: '3rem' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', mb: '2rem' }}>Calendar-Year End Outstanding Debt</Typography>
                <DebtOutstandingLineChart debtProj={debtTimeline} />
            </Box>

            <Box sx={{ textAlign: 'center', mb: '5rem', mt: '3rem' }}>
                <Typography variant="h5" sx={{ textAlign: 'left', mb: '2rem' }}>Annual Debt Repayment</Typography>
                <DebtRepaymentLineChart debtProj={debtTimeline} />
            </Box>

            <Typography variant='h5' sx={{ mt: '2rem', mb: '0.5rem', color: '#53565B' }}>Debt Details</Typography>
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
                        backgroundColor: '#FFE3CA',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Total Loan Amount</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{totalLoanAmount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#FFE3CA',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Debt Free Age</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year + debtFreeAge - currentAge}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{debtFreeAge} years old</Typography>
                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#FFE3CA',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Total Debt Outstanding</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{totalCurrentDebtOutstanding.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>

                </Grid>
                <Grid
                    item xs={12}
                    sx={{
                        backgroundColor: '#FFE3CA',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Total Interest Outstanding</Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>As at {year}</Typography>
                    <Typography variant="h3" sx={{ mb: 3 }}>{totalInterestOutstanding.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'SGD',
                        maximumFractionDigits: 0,
                    })}</Typography>
                </Grid>
            </Grid>
        </>

    )
}

export default DebtProjections