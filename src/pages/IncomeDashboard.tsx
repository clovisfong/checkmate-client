import { Container, Grid, Typography } from '@mui/material'
import { getYear } from 'date-fns'
import React from 'react'
import IncomeEntries from '../components/FinancialEntries/IncomeEntries'

const IncomeDashboard = () => {

    const today = new Date
    const year = getYear(today)

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

            <IncomeEntries />
        </Container>
    )
}

export default IncomeDashboard