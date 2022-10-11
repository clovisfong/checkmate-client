import { Button, Container, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from "yup";
import React, { FC, useEffect, useState } from "react";
import { IUserDetails } from '../Interface';
import { differenceInCalendarYears, format } from 'date-fns';
import { Box } from '@mui/system';



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
const token: any = sessionStorage.getItem('token')
const userDetails: IUserDetails = parseJwt(token)

const birthDate = new Date(userDetails.date_of_birth)
const currentDate = new Date // use current date
const currentAge = differenceInCalendarYears(currentDate, birthDate) // 24
const yearsToExpectancy = userDetails.life_expectancy - currentAge


const debtOptions = ['Home', 'Personal', 'Car', 'Credit Card', 'Education', 'Others']
const statusOptions = ['Current', 'Future']
const commitmentPeriodOptions: number[] = [0]

for (let year = 1; year <= 35; year++) {
    commitmentPeriodOptions.push(year)
}





const DebtForm = ({ setSearchParams, setFinancialInfo, financialInfo }: any) => {

    const [disable, setDisable] = useState(false)

    const formik = useFormik({
        initialValues: {
            debt_type: "",
            loan_amount: "",
            debt_name: "",
            interest_rate: "",
            debt_status: "",
            commitment_period_months: "",
            start_date: "",
            monthly_commitment: "",

        },
        validationSchema: Yup.object({
            debt_type: Yup.string().required("Required"),
            loan_amount: Yup.number()
                .typeError("You must specify a number")
                .required("Required")
                .min(0),
            debt_name: Yup.string().required("Required").min(4, 'Too Short!').max(30, 'Too Long!'),
            interest_rate: Yup.number()
                .typeError("You must specify a number")
                .required("Required"),
            debt_status: Yup.string().required("Required"),
            commitment_period_months: Yup.number().required("Required"),
            start_date: Yup.date()
                .min(new Date(), "Please put future date"),
            monthly_commitment: Yup.number()
                .typeError("You must specify a number")
                .min(0),

        }),
        onSubmit: (values: any) => {

            if (values.debt_status === 'Current') {
                values.start_date = format(new Date(), "yyyy-MM-dd")
            }
            if (values.monthly_commitment === '') {
                values.monthly_commitment = 0
            }
            console.log(values);
            // setSearchParams({ section: 'assets' })
            setFinancialInfo([...financialInfo, values])
            setDisable(true)
            setTimeout(() => {
                setDisable(false)
            }, 3000)
            // const createUser = urlcat(SERVER, "/users");

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

    console.log('debt section', financialInfo)

    const handleClick = () => {
        setSearchParams({ section: 'expenses' })
    }


    return (
        <Container maxWidth='md' sx={{ width: '100%' }}>
            <Grid item xs={12} >
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
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Type*</Typography>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values.debt_type}
                                    id="debt_type"
                                    name="debt_type"
                                    onChange={(e) => formik.handleChange(e)}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    {debtOptions.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.debt_type && formik.errors.debt_type ? (
                                <div>{formik.errors.debt_type}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Loan Amount*</Typography>

                            <TextField
                                required
                                id="loan_amount"
                                autoComplete="off"
                                name="loan_amount"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.loan_amount}
                            />
                            {formik.touched.loan_amount &&
                                formik.errors.loan_amount ? (
                                <div>{formik.errors.loan_amount}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Name*</Typography>

                            <TextField
                                required
                                id="debt_name"
                                autoComplete="off"
                                name="debt_name"
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.debt_name}
                            />
                            {formik.touched.debt_name &&
                                formik.errors.debt_name ? (
                                <div>{formik.errors.debt_name}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Interest Rate (in %)*</Typography>
                            <TextField
                                id="interest_rate"
                                autoComplete="off"
                                name="interest_rate"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.interest_rate}
                            />
                            {formik.touched.interest_rate && formik.errors.interest_rate ? (
                                <div>{formik.errors.interest_rate}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Status*</Typography>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values.debt_status}
                                    id="debt_status"
                                    name="debt_status"
                                    onChange={(e) => formik.handleChange(e)}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    {statusOptions.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.debt_status && formik.errors.debt_status ? (
                                <div>{formik.errors.debt_status}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Commitment Period*</Typography>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values.commitment_period_months}
                                    id="commitment_period_months"
                                    name="commitment_period_months"
                                    onChange={(e) => formik.handleChange(e)}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    {commitmentPeriodOptions.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.commitment_period_months && formik.errors.commitment_period_months ? (
                                <div>{formik.errors.commitment_period_months}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Start Date*</Typography>
                            <TextField
                                required
                                disabled={formik.values.debt_status === 'Future' ? false : true}
                                id="start_date"
                                autoComplete="off"
                                name="start_date"
                                type='date'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.debt_status === 'Future' ? formik.values.start_date : format(new Date(), "yyyy-MM-dd")}
                            />
                            {formik.touched.start_date && formik.errors.start_date ? (
                                <div>{formik.errors.start_date}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Monthly Commitment</Typography>

                            <TextField
                                id="monthly_commitment"
                                autoComplete="off"
                                name="monthly_commitment"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.monthly_commitment}
                            />
                            {formik.touched.monthly_commitment &&
                                formik.errors.monthly_commitment ? (
                                <div>{formik.errors.monthly_commitment}</div>
                            ) : null}
                        </Grid>



                    </Grid>


                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Button disabled={disable} onClick={handleClick} sx={{
                            background: '#2852A0',
                            color: '#FFFBF0',
                            letterSpacing: '0.2rem',
                            mt: '3rem',
                            pl: '3rem',
                            pr: '3rem',
                            mb: '0.5rem',
                            borderRadius: '0.7rem',
                            '&:hover': {
                                backgroundColor: '#254D71',
                            },

                        }}> Back
                        </Button>
                        <Button disabled={disable} type="submit" sx={{
                            background: '#2852A0',
                            color: '#FFFBF0',
                            letterSpacing: '0.2rem',
                            mt: '3rem',
                            pl: '3rem',
                            pr: '3rem',
                            mb: '0.5rem',
                            borderRadius: '0.7rem',
                            '&:hover': {
                                backgroundColor: '#254D71',
                            },

                        }}> Next: Assets
                        </Button>

                    </Grid>

                </form>
            </Grid >


        </Container>
    )
}

export default DebtForm