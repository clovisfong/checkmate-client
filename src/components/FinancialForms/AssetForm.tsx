import { Button, Container, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from "yup";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const assetOptions = ['Property', 'Car', 'Savings', 'Other Assets & Investments']



const AssetForm = ({ setSearchParams, setFinancialInfo, financialInfo }: any) => {

    const [disable, setDisable] = useState(false)
    const navigateToOverview = useNavigate()

    const formik = useFormik({
        initialValues: {
            asset_type: "",
            current_value: "",
            asset_name: "",

        },
        validationSchema: Yup.object({
            asset_type: Yup.string().required("Required"),
            current_value: Yup.number()
                .typeError("You must specify a number")
                .required("Required")
                .min(0),
            asset_name: Yup.string().required("Required").min(4, 'Too Short!').max(30, 'Too Long!'),

        }),
        onSubmit: (values: any) => {


            console.log(values);

            setFinancialInfo([...financialInfo, values])
            setDisable(true)
            setTimeout(() => {
                setDisable(false)
            }, 3000)
            navigateToOverview('/overview')
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

    console.log('asset section', financialInfo)

    const handleClick = () => {
        setSearchParams({ section: 'debts' })
    }


    return (
        <Container maxWidth='sm' sx={{ width: '100%' }}>
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

                        <Grid item xs={12} >
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Type*</Typography>
                            <FormControl sx={{ width: "100%" }}>
                                <Select
                                    value={formik.values.asset_type}
                                    id="asset_type"
                                    name="asset_type"
                                    onChange={(e) => formik.handleChange(e)}
                                    onBlur={formik.handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    {assetOptions.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.asset_type && formik.errors.asset_type ? (
                                <div>{formik.errors.asset_type}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Current Value*</Typography>

                            <TextField
                                required
                                id="current_value"
                                autoComplete="off"
                                name="current_value"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.current_value}
                            />
                            {formik.touched.current_value &&
                                formik.errors.current_value ? (
                                <div>{formik.errors.current_value}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12} >
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Name*</Typography>

                            <TextField
                                required
                                id="asset_name"
                                autoComplete="off"
                                name="asset_name"
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.asset_name}
                            />
                            {formik.touched.asset_name &&
                                formik.errors.asset_name ? (
                                <div>{formik.errors.asset_name}</div>
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

                        }}> Submit
                        </Button>

                    </Grid>

                </form>
            </Grid >


        </Container>
    )
}

export default AssetForm