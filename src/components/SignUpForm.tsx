
import { useNavigate } from 'react-router-dom';
import React, { FC, useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import urlcat from "urlcat";
import axios from "axios";
import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';

const SignUpForm: FC = () => {

    const [userEmail, setUserEmail] = useState(0);
    const [disable, setDisable] = useState(false)

    const token: any = sessionStorage.getItem("token");
    const navigateToSurvey = useNavigate();
    const SERVER = import.meta.env.VITE_SERVER;

    const parseJwt = (token: string) => {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    };

    const genderOptions = ["Male", "Female", "Prefer not to say"]


    const formik = useFormik({
        initialValues: {
            name: "",
            date_of_birth: "",
            gender: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required").min(4, 'Too Short!').max(40, 'Too Long!'),
            date_of_birth: Yup.date().required("Required")
                .max(new Date(), "Invalid date of birth"),
            gender: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email address").required("Required")
            // .test(
            //     "value-email",
            //     "Email is in used",
            //     (email: any): boolean => {
            //         const clientUrl = urlcat(SERVER, `clients/findByEmail/${email}`);
            //         axios
            //             .get(clientUrl)
            //             .then((res) => setUserEmail(res.data.length))
            //             .catch((err) => console.log(err));
            //         return userEmail === 0 ? true : false;
            //     }
            // )
            ,

            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                )
                .required("Required"),
        }),
        onSubmit: (values) => {
            console.log(values);
            const createUser = urlcat(SERVER, "/users");

            // axios
            //     .post(createUser, values)
            //     .then((res) => {
            //         sessionStorage.setItem("token", res.data.token);
            //         const payload = parseJwt(res.data.token);
            //         console.log(payload.userId);
            //         navigateToOverview(`/client/${payload.userId}/dashboard`);
            //     })
            //     .catch((error) => console.log(error.response.data.error));
        },
    });

    const handleClick = () => {
        setDisable(true)
        navigateToSurvey('/survey')
        setTimeout(() => {
            setDisable(false)
        }, 3000)
    }

    return (
        <Container maxWidth='md' sx={{ width: '80%' }}>
            <Grid item xs={12}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                        container
                        spacing={5}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Name</Typography>

                            <TextField
                                required
                                id="name"
                                autoComplete="off"
                                name="name"
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.name}
                            />
                            {formik.touched.name &&
                                formik.errors.name ? (
                                <div>{formik.errors.name}</div>
                            ) : null}
                        </Grid>




                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Date of Birth</Typography>
                            <TextField
                                required
                                id="date_of_birth"
                                autoComplete="off"
                                name="date_of_birth"
                                type='date'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.date_of_birth}
                            />
                            {formik.touched.date_of_birth && formik.errors.date_of_birth ? (
                                <div>{formik.errors.date_of_birth}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Gender</Typography>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values.gender}
                                    id="gender"
                                    name="gender"
                                    onChange={(e) => formik.handleChange(e)}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    {genderOptions.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.gender && formik.errors.gender ? (
                                <div>{formik.errors.gender}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Email</Typography>

                            <TextField
                                required
                                id="email"
                                autoComplete="off"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Password</Typography>

                            <TextField
                                required
                                id="password"
                                autoComplete="off"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </Grid>
                    </Grid>


                    <Grid item sx={{ textAlign: 'center' }}>
                        <Button disabled={disable} onClick={handleClick} type="submit" sx={{
                            background: '#2852A0',
                            color: '#FFFBF0',
                            letterSpacing: '0.2rem',
                            mt: '3rem',
                            pl: '3rem',
                            pr: '3rem',
                            mb: '0.5rem',
                            border: '0.1rem solid #2852A0',
                            borderRadius: '0.7rem',
                            '&:hover': {
                                backgroundColor: '#254D71',
                            },

                        }}> Create Account
                        </Button>
                    </Grid>

                </form>
            </Grid >
        </Container >
    );
}

export default SignUpForm