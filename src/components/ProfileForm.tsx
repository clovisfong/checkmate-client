
import { useNavigate } from 'react-router-dom';
import React, { FC, useContext, useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import urlcat from "urlcat";
import axios from "axios";
import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import UserDetailsContext from './contextStore/userdetails-context';
import jwt_decode from 'jwt-decode';
import { IUserDetails, IUserDetails2 } from '../Interface';
import { differenceInCalendarYears } from 'date-fns';

interface Props {
    userDetails: IUserDetails2;
    update: () => void
}


const ProfileForm = ({ userDetails, update }: Props) => {


    const [error, setError] = useState<String>("");
    const [disable, setDisable] = useState(false)

    const userContext = useContext(UserDetailsContext)
    const token: any = sessionStorage.getItem('token')

    const birthDate = new Date(userContext.date_of_birth)
    const currentDate = new Date // use current date
    const currentAge = differenceInCalendarYears(currentDate, birthDate)
    const yearsToExpectancy = userContext.life_expectancy - currentAge

    const retirementAgeOptions = []

    for (let age = currentAge; age <= userDetails.life_expectancy; age++) {
        retirementAgeOptions.push(age)
    }

    const genderOptions = ["Male", "Female", "Prefer not to say"]
    const retirementLifestyleOptions = ['Simple', 'Maintain', 'Enhanced']

    const lifeExpectancyOptions = []
    for (let age = 70; age <= 120; age++) {
        lifeExpectancyOptions.push(age)
    }


    const convertDate = (str: string) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }





    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userDetails.name,
            date_of_birth: convertDate(userDetails.date_of_birth),
            email: userDetails.email,
            gender: userDetails.gender,
            retirement_age: userDetails.retirement_age,
            retirement_lifestyle: userDetails.retirement_lifestyle,
            life_expectancy: userDetails.life_expectancy,
            legacy_allocation: userDetails.legacy_allocation,
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required").min(4, 'Too Short!').max(40, 'Too Long!'),
            date_of_birth: Yup.date().required("Required")
                .max(new Date(), "Invalid date of birth"),
            email: Yup.string().email("Invalid email address").required("Required"),
            gender: Yup.string().required("Required"),
            retirement_age: Yup.number().required("Required"),
            retirement_lifestyle: Yup.string().required("Required"),
            life_expectancy: Yup.number().required("Required"),
            legacy_allocation: Yup.number()
                .typeError("You must specify a number")
                .required("Required")
                .min(0, 'Amount must be a positive number'),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {


            const keys = {
                name: "",
                date_of_birth: "",
                gender: "",
                email: "",
                password: "",
                retirement_age: 0,
                retirement_lifestyle: "",
                legacy_allocation: 0,
                life_expectancy: 0
            }

            const userRequest = Object.assign(keys, values)
            console.log('check values', userRequest)


            const SERVER = import.meta.env.VITE_SERVER;
            const url = urlcat(SERVER, `/users/${userContext.id}`);
            console.log(url)

            const header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            axios
                .put(url, userRequest, header)
                .then((res) => {
                    setError("Account updated successfully!")
                    sessionStorage.setItem("token", res.data.token);
                    const userInfo: IUserDetails = jwt_decode(res.data.token)
                    userContext.setUserState(userDetails)
                    userContext.fetchUpdate()
                    update()

                })
                .catch((error) => setError(error.response.data.msg));
        },
    });


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

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Name*</Typography>

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




                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Date of Birth*</Typography>
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


                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Email*</Typography>

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


                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Gender*</Typography>
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


                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Retirement Age*</Typography>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values.retirement_age}
                                    id="retirement_age"
                                    name="retirement_age"
                                    onChange={(e) => formik.handleChange(e)}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    {retirementAgeOptions.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.retirement_age && formik.errors.retirement_age ? (
                                <div>{formik.errors.retirement_age}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Retirement LifeStyle*</Typography>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values.retirement_lifestyle}
                                    id="retirement_lifestyle"
                                    name="retirement_lifestyle"
                                    onChange={(e) => formik.handleChange(e)}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    {retirementLifestyleOptions.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.retirement_lifestyle && formik.errors.retirement_lifestyle ? (
                                <div>{formik.errors.retirement_lifestyle}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Life Expectancy*</Typography>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values.life_expectancy}
                                    id="life_expectancy"
                                    name="life_expectancy"
                                    onChange={(e) => formik.handleChange(e)}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    {lifeExpectancyOptions.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.life_expectancy && formik.errors.life_expectancy ? (
                                <div>{formik.errors.life_expectancy}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Legacy Allocation ($)*</Typography>

                            <TextField
                                required
                                id="legacy_allocation"
                                autoComplete="off"
                                name="legacy_allocation"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.legacy_allocation}
                            />
                            {formik.touched.legacy_allocation &&
                                formik.errors.legacy_allocation ? (
                                <div>{formik.errors.legacy_allocation}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12} >
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Password*</Typography>

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
                        <Button disabled={disable} type="submit" sx={{
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

                        }}> Submit Details
                        </Button>
                        <Typography variant='body2' sx={{ color: 'red' }}>{error} </Typography>

                    </Grid>

                </form>
            </Grid >
        </Container >
    );
}

export default ProfileForm