import { createTheme, Theme } from '@mui/material'


const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#2852A0'
        },
        secondary: {
            main: '#254D71'
        },
    },
    typography: {
        h2: {
            fontSize: "3rem",
            fontWeight: 500,
            fontFamily: 'Monserrat',
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            }

        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 500,
            fontFamily: 'Monserrat'

        },
        h4: {
            fontSize: "1.3rem",
            fontWeight: 500,
            fontFamily: 'Monserrat'

        },
        h5: {
            fontSize: "1.1rem",
            fontWeight: 500,
            fontFamily: 'Monserrat'

        },
        body1: {
            fontSize: "0.9rem",
            letterSpacing: '0.025rem',
            fontFamily: 'Roboto'
        },
        body2: {
            fontSize: "0.7rem",
            // letterSpacing: '0.1rem',
            fontFamily: 'Roboto'

        }
    }

})

export default theme