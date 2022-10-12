import { Container, Grid, Typography } from '@mui/material'
import { getYear } from 'date-fns'
import React, { useEffect, useState } from 'react'
import IncomeEntries from '../components/FinancialEntries/IncomeEntries'
import axios from 'axios';
import urlcat from 'urlcat';
import { IIncomeData } from '../Interface';



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

    const today = new Date
    const year = getYear(today)

    const token: any = sessionStorage.getItem("token");
    // const userDetails = parseJwt(token)
    // console.log(userDetails)


    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/income/");
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const update = () => {
        setRefresh(!refresh)
    }


    useEffect(() => {

        axios
            .get(url, header)
            .then((res) => {
                setIncomeData(res.data)
            })
            .catch((error) => console.log(error.response.data.error));

    }, [refresh])

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
                    <Typography variant="h5" sx={{ mb: 3 }}>Income</Typography>
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
                    <Typography variant="h5" sx={{ mb: 3 }}>Expenses</Typography>
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
                    <Typography variant="h5" sx={{ mb: 3 }}>Debts</Typography>
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
                    <Typography variant="h5" sx={{ mb: 3 }}>Assets</Typography>
                </Grid>
            </Grid>
            <Typography variant='h4' sx={{ mb: '0.5rem', color: '#53565B' }}>Overview for Year {year}</Typography>

            <IncomeEntries incomeData={incomeData} update={update} />
        </Container>
    )
}

export default IncomeDashboard