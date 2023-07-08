import { Alert, Box, Button, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_OUT, forgotFun } from '../RTK/Reducers/Reducers';
import { NavLink } from "react-router-dom";
import { Toaster } from '../utils/Helper';

const ForgotPass = () => {
    const dispatch = useDispatch();
    const { forgotError, forgotSuccess } = useSelector(store => store.mainReducer);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleForgotReset = (data) => {
        Toaster('loading', 'Requesting ...')
        dispatch(CLEAR_OUT())
        dispatch(forgotFun({
            email: data.email
        }))
    }


    return (
        <div>
            <Grid container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item xs={12}>
                    <Typography variant='h5' className='heading'>Recover Passwords</Typography>
                    <Typography className='description'> Enter You Email </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Box className='box' >
                        <Typography className='box-title' mb='18px'>Forgot password</Typography>
                        <Box px='46px'>
                            {(forgotError) && <Alert sx={{ mb: '20px', '& .MuiPaper-root': { borderRadius: '10px' } }} severity="error">{(forgotError)}!</Alert>}
                            {(forgotSuccess) && <Alert sx={{ mb: '20px', '& .MuiPaper-root': { borderRadius: '10px' } }} severity="success">{(forgotSuccess)}!</Alert>}
                        </Box>
                        <Stack alignItems='center' justifyContent={'center'} spacing={2} px='48px' mb='40px'
                            component='form' onSubmit={handleSubmit(handleForgotReset)} noValidate
                        >
                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    placeholder='Email'
                                    fullWidth
                                    type='email'
                                    name='email'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {emailIcon}
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    sx={styles.textField}
                                    {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                                    error={errors.email}
                                />
                                {errors.email && <>{errors.email.type === 'pattern' ? ErrorText("Enter a valid pattern!") : ErrorText("Field is Required!")}</>}
                            </Box>
                            <Button type='submit' variant='contained' className='submitBtn'>
                                Request Reset
                            </Button>
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Stack mt='19px' direction={'row'} alignItems='center' justifyContent={'space-between'} sx={{ maxWidth: '540px', marginX: 'auto', }}>
                        <NavLink to='/login' style={{ fonSize: '13px', color: '#CED4DA', textDecoration: 'none' }}>Login Now</NavLink>
                        <NavLink to='/sign-up' style={{ fonSize: '13px', color: '#CED4DA', textDecoration: 'none' }}>Create new account</NavLink>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default ForgotPass;

const emailIcon = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7.42284 8.20313C7.2933 8.27452 7.1478 8.31196 6.99989 8.31196C6.85198 8.31196 6.70648 8.27452 6.57694 8.20313L0.4375 4.81622V11.1563C0.437847 11.5042 0.57624 11.8379 0.822306 12.0839C1.06837 12.33 1.40201 12.4684 1.75 12.4688H12.25C12.598 12.4684 12.9316 12.33 13.1777 12.0839C13.4238 11.8379 13.5622 11.5042 13.5625 11.1563V4.81622L7.42284 8.20313Z" fill="#ADB5BD" />
    <path d="M12.2505 1.53125H1.75049C1.4025 1.5316 1.06886 1.66999 0.822794 1.91606C0.576728 2.16212 0.438336 2.49576 0.437988 2.84375V3.9375C0.437973 3.97664 0.448459 4.01506 0.468351 4.04877C0.488243 4.08247 0.516813 4.11022 0.551082 4.12912L6.89483 7.62912C6.92719 7.64697 6.96354 7.65633 7.00049 7.65633C7.03744 7.65633 7.07379 7.64697 7.10614 7.62912L13.4499 4.12912C13.4842 4.11022 13.5127 4.08247 13.5326 4.04877C13.5525 4.01506 13.563 3.97664 13.563 3.9375V2.84375C13.5626 2.49576 13.4242 2.16212 13.1782 1.91606C12.9321 1.66999 12.5985 1.5316 12.2505 1.53125Z" fill="#ADB5BD" />
</svg>

const styles = {
    textField: {
        boxShadow: `0px 1px 0px 0px rgba(0, 0, 0, 0.02), 0px 1px 3px 0px rgba(50, 50, 93, 0.15)`,
        borderRadius: '4px',
        '& .MuiOutlinedInput-root': {
            border: 'none',
            height: '46px',
            '&:focus': {
                boxShadow: 'none !important',
                border: 'none !important',
                outline: 'none !important',
            },
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 'none !important',
            outline: 'none !important',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
        },
        '& .MuiInputLabel-root': {

        },
        '& input': {
            color: '#8898AA',
            paddingLeft: '10px',
            fontSize: '14px',
            padding: '14px !important'
        }
    },
};

export const ErrorText = text => <Typography sx={{ fontSize: '9px', color: 'red', marginBottom: '8px' }}>{text}</Typography>
