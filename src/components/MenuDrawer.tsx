import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import { Button } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MenuDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const navigateToProfile = useNavigate()




    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleProfile = () => {
        navigateToProfile('/profile')
    }


    return (
        <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            {/* <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar> */}
            <Drawer variant="permanent" open={open} PaperProps={{ sx: { backgroundColor: '#EDEEF1', border: 'none' } }}>
                <DrawerHeader sx={{ display: 'flex', mt: '1rem', justifyContent: 'center' }}>
                    {open ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ mr: '1.5rem' }}>
                                <img
                                    src="https://i.imgur.com/z1F6OfZ.png"
                                    alt='CheckMate'
                                    style={{
                                        maxWidth: '120px',

                                    }} />
                            </Box>
                            <IconButton onClick={handleDrawerClose} sx={{}}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Box>
                        :

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                        //  sx={{
                        //      marginRight: 5,
                        //      ...(open && { display: 'none' }),
                        //  }}
                        >
                            <MenuIcon />
                        </IconButton>
                    }

                </DrawerHeader>

                <List sx={{ textAlign: 'center' }}>
                    <Link to="/dashboard/overview" style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem', mt: '1.5rem' }}>
                        <HouseOutlinedIcon sx={{ color: '#53565B' }} />

                        <Typography variant='body1' sx={{ ml: '1.5rem', color: '#53565B' }}>Dashboard</Typography>

                    </Box>
                    </Link>
                    <Link to="/dashboard/income" style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem' }}>
                        <MonetizationOnOutlinedIcon sx={{ color: '#53565B' }} />

                        <Typography variant='body1' sx={{ ml: '1.5rem', color: '#53565B' }}>Income</Typography>
                    </Box>
                    </Link>
                    <Link to="/dashboard/expenses" style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem' }}>
                        <PriceChangeOutlinedIcon sx={{ color: '#53565B' }} />

                        <Typography variant='body1' sx={{ ml: '1.5rem', color: '#53565B' }}>Expenses</Typography>
                    </Box>
                    </Link>
                    <Link to="/dashboard/debts" style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem' }}>
                        <CreditCardOutlinedIcon sx={{ color: '#53565B' }} />

                        <Typography variant='body1' sx={{ ml: '1.5rem', color: '#53565B' }}>Debts</Typography>
                    </Box>
                    </Link>
                    <Link to="/dashboard/assets" style={{ textDecoration: 'none' }}><Box sx={{ display: 'flex', pl: '1.5rem', pr: '1.5rem', pt: '1rem', pb: '1rem' }}>
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

                    {/* {['Dashboard', 'Income', 'Expenses', 'Debts', 'Assets'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,

                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))} */}
                </List>


            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

                <Outlet />

            </Box>
        </Box>
    );
}
