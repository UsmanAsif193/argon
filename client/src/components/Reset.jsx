import { Alert, Box, Button, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_OUT, ResetFun } from '../RTK/Reducers/Reducers';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Toaster } from '../utils/Helper';

const Reset = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { resetError, resetSuccess } = useSelector(store => store.mainReducer);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    React.useEffect(() => {
        if (!token) {
            navigate('/forgot-password')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [showPassword, setShowPassword] = React.useState({
        new: false,
        con: false
    });
    const handleTogglePasswordVisibility = (key) => e => {
        setShowPassword(pv => ({ ...pv, [key]: !(pv[key]) }))
    };

    const newpassword = watch('newpassword');

    const validatePasswordMatch = (value) => {
        if (value !== newpassword) {
            return 'Passwords do not match';
        }
        return true;
    };

    const handleForgotReset = (data) => {
        Toaster('loading', 'Resetting waite ...!')
        if (token) {
            dispatch(CLEAR_OUT())
            dispatch(ResetFun({
                password: data.newpassword,
                token: token
            }))
        }
    }

    return (
        <div>
            <Grid container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item xs={12}>
                    <Typography variant='h5' className='heading'>Enter New Passwords</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Box className='box' >
                        <Typography className='box-title' mb='18px'>Reset password</Typography>
                        <Box px='46px'>
                            {(resetError) && <Alert sx={{ mt: '20px', '& .MuiPaper-root': { borderRadius: '10px' } }} severity="error">{(resetError)}!</Alert>}
                            {(resetSuccess) && <Alert sx={{ mt: '20px', '& .MuiPaper-root': { borderRadius: '10px' } }} severity="success">{(resetSuccess)}!</Alert>}
                        </Box>
                        <Stack alignItems='center' justifyContent={'center'} spacing={2} px='48px' mb='40px'
                            component='form' onSubmit={handleSubmit(handleForgotReset)} noValidate
                        >

                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    placeholder='New Password'
                                    fullWidth={true}
                                    name="newpassword"
                                    type={showPassword.new ? 'text' : "password"}
                                    disabled={resetSuccess}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <span onClick={handleTogglePasswordVisibility('new')}>{passwordIcon}</span>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    sx={styles.textField}
                                    {...register('newpassword', { required: true, minLength: 6 })}
                                    error={errors.newpassword}
                                />
                                {errors.newpassword && <>{errors.newpassword.type === 'minLength' ? ErrorText("Minimum Length 6 characters!") : ErrorText("Field is Required!")}</>}
                            </Box>

                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    placeholder='Confirm Password'
                                    fullWidth={true}
                                    name="confirmpassword"
                                    disabled={resetSuccess}
                                    type={showPassword.con ? 'text' : "password"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <span onClick={handleTogglePasswordVisibility('con')}>{passwordIcon}</span>
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register('confirmpassword', { required: true, validate: validatePasswordMatch })}
                                    variant="outlined"
                                    sx={styles.textField}
                                    error={errors.confirmpassword}
                                />
                                {errors.confirmpassword && <span>{errors.confirmpassword.type === 'validate' ? ErrorText('Passwords do not match') : ErrorText("Field is Required!")}</span>}
                            </Box>

                            <Button disabled={resetSuccess} type='submit' variant='contained' className='submitBtn'>
                                Reset Now
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

export default Reset;

const passwordIcon = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 5.03131C4.58369 5.03131 2.625 6.99 2.625 9.40631C2.625 11.8226 4.58369 13.7813 7 13.7813C9.41631 13.7813 11.375 11.8226 11.375 9.40631C11.375 6.99 9.41631 5.03131 7 5.03131ZM7.21875 10.0429V11.3751H6.78125V10.0429C6.16066 9.93853 5.6875 9.40019 5.6875 8.75006C5.6875 8.02512 6.27506 7.43756 7 7.43756C7.72494 7.43756 8.3125 8.02512 8.3125 8.75006C8.3125 9.40019 7.83934 9.93853 7.21875 10.0429Z" fill="#ADB5BD" />
    <path d="M4.59399 5.24125V3.0625C4.59399 1.73578 5.67353 0.65625 7.00024 0.65625C8.32696 0.65625 9.40649 1.73578 9.40649 3.0625H9.84399C9.84399 1.4945 8.56824 0.21875 7.00024 0.21875C5.43224 0.21875 4.15649 1.4945 4.15649 3.0625V5.52694C4.29671 5.42391 4.44284 5.32875 4.59399 5.24125Z" fill="#ADB5BD" />
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
