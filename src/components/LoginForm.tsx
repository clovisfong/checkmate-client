import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import urlcat from 'urlcat';
import { useFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import UserDetailsContext from './contextStore/userdetails-context';
import jwt_decode from 'jwt-decode';
import { IUserDetails } from '../Interface';

const LoginForm = () => {

    const [error, setError] = useState<String>("");

    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/users/login");
    const navigate = useNavigate();

    const userContext = useContext(UserDetailsContext)


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {

            const header = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            axios
                .post(
                    url
                    , values, header)
                .then((res) => {
                    sessionStorage.setItem("token", res.data.token);
                    const userDetails: IUserDetails = jwt_decode(res.data.token)
                    userContext.setUserState(userDetails)
                    navigate('/dashboard/overview');
                })
                .catch((error) => setError(error.response.data.msg));
        },
    });



    return (
        <Container maxWidth='md'>

            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>


                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#53565B" }}>
                                Email</Typography>

                            <TextField
                                id="email"
                                autoComplete="off"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                sx={{
                                    width: "100%",
                                }}


                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}

                        </Grid>


                        <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#53565B" }}>
                                Password</Typography>
                            <TextField
                                id="password"
                                autoComplete="off"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                sx={{
                                    width: "100%",
                                }}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </Grid>
                    </Grid>


                    <Grid item sx={{ textAlign: 'center' }}>
                        <Button type="submit" sx={{
                            background: '#2852A0',
                            color: '#FFFBF0',
                            letterSpacing: '0.2rem',
                            mt: '3rem',
                            pl: '4rem',
                            pr: '4rem',
                            mb: '0.5rem',
                            border: '0.1rem solid #2852A0',
                            borderRadius: '0.7rem',
                            '&:hover': {
                                backgroundColor: '#254D71',
                            }
                        }}> Let's Go!
                        </Button>
                        <Typography variant='body2' sx={{ color: 'red' }}>{error} </Typography>

                    </Grid>

                </form>

                <Grid item xs={12} sx={{ mt: '3rem', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: "0.5rem" }}>
                        <Typography variant='body2'>Don't have an account? </Typography>
                        <Link to="/sign-up">
                            <Typography variant='body2'>Sign up!</Typography>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoginForm