import { Container } from '@mui/system'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material';


const NavBarWithLogin = () => {

    const navigatePage = useNavigate()

    const handlePage = () => {
        navigatePage('/')
    }


    const handleClick = () => {
        navigatePage('/login')
    }

    const handleSign = () => {
        navigatePage('/sign-up')
    }



    return (
        <>
            <Container maxWidth='lg' sx={{
                mt: '3rem',
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'space-between' },
                alignItems: 'center'
            }}>
                <img
                    src="https://i.imgur.com/z1F6OfZ.png"
                    alt='CheckMate'
                    onClick={handlePage}
                    style={{
                        maxWidth: '12rem',
                        cursor: 'pointer'
                    }} />
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button onClick={handleClick} sx={{
                        color: '#53565B',
                        letterSpacing: '0.2rem',
                        pl: '1rem',
                        pr: '1rem',
                        mr: '1rem',
                        border: '0.1rem solid #53565B',
                        borderRadius: '0.7rem',
                        '&:hover': {
                            backgroundColor: '#53565B',
                            color: 'white'
                        },
                    }}> Login

                    </Button>

                    <Button onClick={handleSign} sx={{
                        color: '#53565B',
                        letterSpacing: '0.2rem',
                        pl: '1rem',
                        pr: '1rem',
                        border: '0.1rem solid #53565B',
                        borderRadius: '0.7rem',
                        '&:hover': {
                            backgroundColor: '#53565B',
                            color: 'white'
                        },
                    }}> Sign Up


                    </Button>
                </Box>
            </Container>
            <Outlet />
        </>
    )
}

export default NavBarWithLogin

