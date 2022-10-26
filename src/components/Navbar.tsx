import { Container } from '@mui/system'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigateHome = useNavigate()

    const handlePage = () => {
        navigateHome('/')
    }

    return (
        <>
            <Container maxWidth='lg' sx={{
                mt: '3rem',
                display: 'flex',
                justifyContent: { xs: 'center', md: 'left' },
            }}>
                <img
                    src="https://i.imgur.com/z1F6OfZ.png"
                    alt='CheckMate'
                    onClick={handlePage}
                    style={{
                        maxWidth: '12rem',
                        cursor: 'pointer'
                    }} />

            </Container>
            <Outlet />
        </>
    )
}

export default Navbar