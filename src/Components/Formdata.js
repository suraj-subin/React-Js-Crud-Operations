import React, { useEffect } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Form, Field, ErrorMessage } from 'formik'

const Formdata = ({ errors, setFieldValue, touched, isSubmitting, values, showPassword, handleClick }) => {

    const Arr = localStorage.getItem("user_login")
    useEffect(() => {
        if (JSON.parse(Arr)?.remember) {
            // console.log("This is true >>", JSON.parse(Arr))
            setFieldValue("name",JSON.parse(Arr)?.name)
            setFieldValue("password", JSON.parse(Arr)?.password)
            setFieldValue("email", JSON.parse(Arr)?.email)
            setFieldValue("phone", JSON.parse(Arr)?.phone)
        }
    }, [])

    return (
        <>
            <Form noValidate >
                <Field as={TextField} name='name' label='First name' variant="standard" fullWidth
                    value={values.name}
                    error={Boolean(touched.name && errors.name)}
                    helperText={<ErrorMessage name='name' />} required />

                <Field as={TextField} name='email' label='Email' variant="standard" fullWidth
                    value={values.email}
                    error={errors.email && touched.email}
                    helperText={<ErrorMessage name='email' />} required />

                <Field as={TextField} name="phone" label='Phone number' variant="standard" fullWidth
                    value={values.phone}
                    error={errors.phone && touched.phone}
                    helperText={<ErrorMessage name='phone' />} required />

                <div className='main'>
                    <Field as={TextField} name='password' label='Password' type={showPassword ? 'text' : 'password'} variant="standard" fullWidth
                        value={values.password}
                        error={errors.password && touched.password}
                        helperText={<ErrorMessage name='password' />} required />
                    <div onClick={handleClick} className="BTN">
                        {showPassword ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}
                    </div>
                </div>
                <Field as={FormControlLabel} name='remember' control={<Checkbox color="primary" />}
                    label="Remember me" value={values.remember} />

                <Button type="submit" color="primary" startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null} disabled={isSubmitting}
                    fullWidth size="large" variant="contained"> Login </Button>
            </Form>
        </>
    )
}

export default Formdata;