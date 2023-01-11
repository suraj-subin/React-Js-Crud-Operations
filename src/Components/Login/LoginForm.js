import React, { useState } from 'react'
import { Grid, Paper,Typography } from '@mui/material'
import { Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import Formdata from '../Formdata'


const LoginForm = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => setShowPassword((show) => !show);
    
    const paperStyle = { padding: '25px 20px', width: 350, margin: '100px auto' }
    const phoneRegExp = /^[2-9]{2}[0-9]{8}/
    const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        remember: false,
    }
    const validationSchema = Yup.object().shape({
        name: Yup
            .string()
            .min(4, "It's too short")
            .required("Required !!"),

        email: Yup
            .string()
            .email("Enter valid email")
            .required("Required !!"),

        phone: Yup
            .string()
            .matches(phoneRegExp, "Enter valid Phone number")
            .required("Required !!"),

        password: Yup
            .string().min(8, "Minimum characters should be 8")
            .matches(passwordRegExp, "Include upper & lower case, number, special symbol")
            .required('Required !!'),
    })
    return (
        <Grid>
            <Paper elevation={3} style={paperStyle}>
                <Grid style={{ textAlign: "center" }}>
                    <Typography variant='h6'>Login Here</Typography>
                    <Typography variant='caption'>Fill in the fields below to Login into your account.</Typography>
                </Grid>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize={true}

                    onSubmit={async (values, props) => {
                        try {
                            const resp = await axios.post("http://localhost:5000/users", values);
                            navigate("/home");
                            localStorage.setItem("user_login", JSON.stringify(values))
                            // console.log("response is >>", resp.data);
                            setTimeout(() => {
                                props.resetForm(); // Form is reset After Form is Submit.
                            }, 2000);

                        } catch (error) {

                        }
                    }}>
                    {({
                        errors,
                        setFieldValue,
                        touched,
                        isSubmitting,
                        values,
                    }) => (
                        <Formdata
                            errors={errors}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            isSubmitting={isSubmitting}
                            values={values}  
                            handleClick={handleClick}
                            showPassword={showPassword} />
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default LoginForm;