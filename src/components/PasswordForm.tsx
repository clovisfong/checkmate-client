
import { useContext, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import urlcat from "urlcat";
import axios from "axios";
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import UserDetailsContext from './contextStore/userdetails-context';
import jwt_decode from 'jwt-decode';
import { IUserDetails, IUserDetails2 } from '../Interface';

interface Props {
    userDetails: IUserDetails2;
    update: () => void
}


const PasswordForm = ({ userDetails, update }: Props) => {


    const [error, setError] = useState<String>("");
    const [disable, setDisable] = useState(false)

    const userContext = useContext(UserDetailsContext)
    const token: any = sessionStorage.getItem('token')




    const formik = useFormik({
        initialValues: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object({
            old_password: Yup.string().required("Required"),
            new_password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                )
                .required("Required"),
            confirm_password: Yup.string().required("Required")
                .test("password-match", "Password does not match new password", (value: any, context): boolean => {
                    if (context.parent.new_password === value) {
                        return true
                    } else {
                        return false
                    }
                }),
        }),
        onSubmit: (values) => {



            const SERVER = import.meta.env.VITE_SERVER;
            const url = urlcat(SERVER, `/users/changepassword/${userContext.id}`);
            console.log(url)

            const header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            axios
                .put(url, values, header)
                .then((res) => {
                    setError("Password updated successfully!")
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
        <Container maxWidth='md' sx={{ width: '80%', mb: '7rem' }}>

            <Typography variant='h5' sx={{ mt: '2rem', mb: '0.5rem', color: '#53565B' }}>Change Password</Typography>
            <Divider sx={{ mt: '1rem', mb: '2rem' }}></Divider>
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

                        <Grid item xs={12} >
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Old Password*</Typography>

                            <TextField
                                required
                                id="old_password"
                                autoComplete="off"
                                name="old_password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.old_password}
                            />
                            {formik.touched.old_password && formik.errors.old_password ? (
                                <div>{formik.errors.old_password}</div>
                            ) : null}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>New Password*</Typography>

                            <TextField
                                required
                                id="new_password"
                                autoComplete="off"
                                name="new_password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.new_password}
                            />
                            {formik.touched.new_password && formik.errors.new_password ? (
                                <div>{formik.errors.new_password}</div>
                            ) : null}
                        </Grid>


                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ mb: '0.5rem', color: '#53565B' }}>Confirm Password*</Typography>

                            <TextField
                                required
                                id="confirm_password"
                                autoComplete="off"
                                type="password"
                                name="confirm_password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ width: "100%" }}
                                value={formik.values.confirm_password}
                            />
                            {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                <div>{formik.errors.confirm_password}</div>
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

                        }}> Change Password
                        </Button>
                        <Typography variant='body2' sx={{ color: 'red' }}>{error} </Typography>

                    </Grid>

                </form>
            </Grid >
        </Container >
    );
}

export default PasswordForm