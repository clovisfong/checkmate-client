import { differenceInCalendarYears, getYear } from "date-fns"
import { useContext, useEffect, useState } from "react"
import { IDebtData, ITotalDebtProjection, IUserDetails } from "../Interface"
import CalculateDebt from "./Calculations/CalculateDebt"
import UserDetailsContext from "./contextStore/userdetails-context"
import { Line } from '@ant-design/plots';
import { Box, Container, Grid, Typography } from '@mui/material'
import urlcat from "urlcat"
import axios from "axios"


// interface Props {
//     debtData: IDebtData[];
// }


const DebtProjections = () => {

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

    // Fetch Debt Details
    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/debt/");
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
                console.log('debt check', res.data)
                setDebtData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));

    }, [])


    console.log('new', debtData)
    // const userDetails = {
    //     created_at: "Sat, 08 Oct 2022 15:14:00 GMT",
    //     date_of_birth: "Mon, 20 Jul 1998 00:00:00 GMT",
    //     email: "eee@hotmail.com",
    //     gender: "Female",
    //     id: 2,
    //     legacy_allocation: 5000,
    //     life_expectancy: 90,
    //     name: "eee",
    //     new_birthdate: "20-07-1998",
    //     retirement_age: 66,
    //     retirement_lifestyle: "Enhanced",
    //     updated_at: "Sat, 08 Oct 2022 15:14:42 GMT"
    // }

    const debtData2 = [
        {
            commitment_period_months: 36,
            created_at: "Mon, 10 Oct 2022 11:41:23 GMT",
            debt_name: "Personal",
            debt_status: "Current",
            debt_type: "Personal",
            id: 1,
            interest_rate: 6.0,
            loan_amount: 100000,
            monthly_commitment: 0,
            start_date: "Mon, 10 Oct 2022 00:00:00 GMT",
            updated_at: "Mon, 10 Oct 2022 11:41:23 GMT",
            user_details_id: 10
        }

    ]

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


    // Yearly projection for each debt
    const debtProjections = debtData2.map(debt => CalculateDebt(debt))

    console.log(debtProjections)
    // const debtProjections = [
    //     [
    //         { age: 29, yearlyRepayment: 1000 },
    //         { age: 30, yearlyRepayment: 1200 },
    //         { age: 31, yearlyRepayment: 1300 },
    //         { age: 32, yearlyRepayment: 1400 },
    //         { age: 33, yearlyRepayment: 1500 }
    //     ],
    //     [
    //         { age: 29, yearlyRepayment: 2000 },
    //         { age: 30, yearlyRepayment: 2200 },
    //         { age: 31, yearlyRepayment: 2400 },
    //         { age: 32, yearlyRepayment: 2800 },
    //         { age: 33, yearlyRepayment: 3000 }
    //     ],
    // ]

    // Sum all debts for each age
    const debtTimeline: ITotalDebtProjection[] = []

    for (let age = currentAge; age <= userContext.life_expectancy; age++) {
        debtTimeline.push({ "age": age, "totalDebt": 0 })
    }

    debtProjections.forEach((debt) => {
        debt.forEach((projection) => {
            debtTimeline.find((entry) => entry.age === projection.age ? entry.totalDebt += projection.yearlyRepayment : null)
        })
    })



    // Current Year Annual Debt Details
    const currentYearRemainingRepayment = debtTimeline.find((year) => year.age === currentAge)

    // Next Year Annual Debt Details
    const nextYearRepaymentDetails = debtTimeline.find((year) => year.age === currentAge + 1)

    // Retirement Year Annual Debt Details
    const retirementYearRepaymentDetails = debtTimeline.find((year) => year.age === currentAge + yearsToRetirement)

    // Total Debt Earned By Retirement Year
    const totalDebtByRetirement = debtTimeline
        .filter((year) => year.age <= userContext.retirement_age)
        .reduce((prev, curr) => prev + curr.totalDebt, 0)





    const data = debtTimeline.slice(0, 20)

    const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'age',
        yField: 'totalDebt',
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
                        backgroundColor: '#FFE3CA',
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
                        backgroundColor: '#FFE3CA',
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
                        backgroundColor: '#FFE3CA',
                        p: '1rem',
                        pl: '2rem',
                        pr: '2rem',
                        borderRadius: '0.75rem'
                    }}>
                    <Typography variant="h5" sx={{}}>Total Interest Paid</Typography>
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
                        backgroundColor: '#FFE3CA',
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
        </>

    )
}

export default DebtProjections