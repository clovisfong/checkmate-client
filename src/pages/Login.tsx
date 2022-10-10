import { Box, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = () => {

    return (
        <Container maxWidth="lg" sx={{ mt: '7rem' }} >
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'pink' }}> */}



            <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Grid item xs={12} sx={{ mb: '0.5rem', textAlign: 'center' }}>
                    <img
                        src="https://i.imgur.com/z1F6OfZ.png"
                        alt='CheckMate'
                        style={{
                            maxWidth: '10px',
                            minWidth: '40%',

                        }} />
                </Grid>


                <Grid item xs={12} sx={{ mb: '2rem', textAlign: 'center' }}>
                    <Typography variant='body1'>Check your balance mate</Typography>
                </Grid>
            </Grid>

            <LoginForm />

        </Container>
    )
}

export default Login