import { Box, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Login = () => {

    const navigateHome = useNavigate()

    const handlePage = () => {
        navigateHome('/')
    }

    return (
        <Container maxWidth='sm' sx={{
            mt: '8rem',
            mb: '5rem',
            pr: '2rem',
            pl: '2rem',


        }}>

            <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Grid item xs={12} sx={{ mb: '0.5rem', textAlign: 'center' }}>
                    <img
                        src="https://i.imgur.com/z1F6OfZ.png"
                        alt='CheckMate'
                        onClick={handlePage}
                        style={{
                            maxWidth: '10px',
                            minWidth: '60%',
                            cursor: 'pointer'
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



// <Container maxWidth="lg" sx={{ mt: '7rem' }} >
//             {/* <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'pink' }}> */}



//             <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                 <Grid item xs={12} sx={{ mb: '0.5rem', textAlign: 'center' }}>
//                     <img
//                         src="https://i.imgur.com/z1F6OfZ.png"
//                         alt='CheckMate'
//                         style={{
//                             maxWidth: '10px',
//                             minWidth: '40%',

//                         }} />
//                 </Grid>


//                 <Grid item xs={12} sx={{ mb: '2rem', textAlign: 'center' }}>
//                     <Typography variant='body1'>Check your balance mate</Typography>
//                 </Grid>
//             </Grid>

//             <LoginForm />

//         </Container>