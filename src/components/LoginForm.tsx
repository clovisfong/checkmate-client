import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import urlcat from 'urlcat';
import { useFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginForm = () => {

    const [error, setError] = useState<String>("");

    const SERVER = import.meta.env.VITE_SERVER;
    const url = urlcat(SERVER, "/");
    const navigate = useNavigate();




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
            console.log(values);
            axios
                .get(url)
                .then((res) => {
                    console.log(res);
                    // sessionStorage.setItem("token", res.data.token);
                    // const payload = parseJwt(res.data.token);
                    // console.log(payload.userId);
                    // navigate(`/client/${payload.userId}/dashboard`);
                })
                .catch((error) => console.log(error.response.data.error));
        },
    });



    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

                <h3>EMAIL*</h3>
                <input
                    id="email"
                    autoComplete="off"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}

                <h3>PASSWORD*</h3>
                <input
                    id="password"
                    autoComplete="off"
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}

                <button type='submit'>Log In</button>

            </form>
        </div>
    )
}

export default LoginForm