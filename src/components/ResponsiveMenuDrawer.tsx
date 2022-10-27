import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { border } from '@mui/system';

const drawerWidth = 240;

function ResponsiveMenuDrawer(props: any) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navigateToProfile = useNavigate()

    const handleProfile = () => {
        navigateToProfile('/profile')
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>

            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/dashboard/overview" style={{ textDecoration: 'none' }}>

                    <img
                        src="https://i.imgur.com/z1F6OfZ.png"
                        alt='CheckMate'
                        style={{
                            maxWidth: '120px',

                        }} />
                </Link>
            </Toolbar>

            <Divider />
            <List sx={{ textAlign: 'center' }}>

                <Link to="/dashboard/overview" onClick={handleDrawerToggle} style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem', mt: '1.5rem' }}>
                    <HouseOutlinedIcon sx={{ color: '#53565B' }} />

                    <Typography variant='body1' sx={{ ml: '1.5rem', color: '#53565B' }}>Dashboard</Typography>

                </Box>
                </Link>
                <Link to="/dashboard/income" onClick={handleDrawerToggle} style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem' }}>
                    <MonetizationOnOutlinedIcon sx={{ color: '#53565B' }} />

                    <Typography variant='body1' sx={{ ml: '1.5rem', color: '#53565B' }}>Income</Typography>
                </Box>
                </Link>
                <Link to="/dashboard/expenses" onClick={handleDrawerToggle} style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem' }}>
                    <PriceChangeOutlinedIcon sx={{ color: '#53565B' }} />

                    <Typography variant='body1' sx={{ ml: '1.5rem', color: '#53565B' }}>Expenses</Typography>
                </Box>
                </Link>
                <Link to="/dashboard/debts" onClick={handleDrawerToggle} style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem' }}>
                    <CreditCardOutlinedIcon sx={{ color: '#53565B' }} />

                    <Typography variant='body1' sx={{ ml: '1.5rem', color: '#53565B' }}>Debts</Typography>
                </Box>
                </Link>
                <Link to="/dashboard/assets" onClick={handleDrawerToggle} style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem' }}>
                    <AccountBalanceWalletOutlinedIcon sx={{ color: '#53565B' }} />

                    <Typography variant='body1' sx={{ ml: '1.5rem', color: '#53565B' }}>Assets</Typography>
                </Box>
                </Link>

                <Box onClick={handleProfile} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button sx={{
                        display: 'block',
                        background: '#2852A0',
                        color: '#FFFBF0',
                        letterSpacing: '0.2rem',
                        mt: '5rem',
                        mr: '1.5rem',
                        pl: '1rem',
                        pr: '1rem',
                        mb: '0.5rem',
                        border: '0.1rem solid #2852A0',
                        borderRadius: '0.7rem',
                        '&:hover': {
                            backgroundColor: '#254D71',
                        },

                    }}> Edit Profile
                    </Button>
                </Box>

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            {/* <CssBaseline /> */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    display: { xs: 'block', sm: 'none' },
                    background: 'white',
                    boxShadow: 'none',
                    pt: '1rem'
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ mb: '0.3rem', ml: '0.3rem' }}>
                        <IconButton

                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}

                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{}}>
                        <Link to="/dashboard/overview" style={{ textDecoration: 'none' }}>

                            <img
                                src="https://i.imgur.com/z1F6OfZ.png"
                                alt='CheckMate'
                                style={{
                                    maxWidth: '120px',

                                }} />
                        </Link>
                    </Box>

                    <Box sx={{ background: 'blue', pr: '2rem' }}>

                    </Box>

                </Toolbar>

            </AppBar>


            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}

                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >

            </Box>
        </Box>
    );
}

ResponsiveMenuDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveMenuDrawer;
