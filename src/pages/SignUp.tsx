import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import SignUpForm from '../components/SignUpForm'

const SignUp = () => {
    return (
        <Container maxWidth='sm' sx={{
            mt: '10rem',
            mb: '5rem',
            pr: '2rem',
            pl: '2rem'

        }}>
            <Grid container sx={{ mt: '5rem' }}>
                <Grid item xs={12} sx={{ textAlign: 'center', mb: '3rem' }}>
                    <Typography variant='h3' >Register Account</Typography>
                </Grid>
                <SignUpForm />
            </Grid>
        </Container>
    )
}

export default SignUp