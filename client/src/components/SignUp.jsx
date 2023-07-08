import { Alert, Box, Button, Checkbox, Divider, FormControlLabel, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import fireBase from '../utils/firebase';
import { CLEAR_OUT, LOGIN_WITH_GOOGLE_APPLE, SignUpFun } from '../RTK/Reducers/Reducers';
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster } from '../utils/Helper';
import Main from './GithubLogin/main';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { currentUser, signUpSuccess, signUpError, } = useSelector(store => store.mainReducer);

    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    React.useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [currentUser])

    const handleGoogle = async () => {
        const provider = new fireBase.auth.GoogleAuthProvider();
        const res = await fireBase.auth().signInWithPopup(provider);
        if (res.user) {
            const user = res.user;
            dispatch(CLEAR_OUT())
            dispatch(LOGIN_WITH_GOOGLE_APPLE({
                _id: user.uid,
                email: user.email,
                name: user.displayName,
                avatar: user.photoURL
            }))
        }
    }

    // const handleGitHub = () => {

    // }


    const handleSignUp = data => {
        Toaster('loading', 'Signing Up Please hold...!')
        dispatch(CLEAR_OUT())
        dispatch(SignUpFun({
            name: data.name,
            email: data.email,
            password: data.password,
        }));
    }

    return (
        <div>
            <Grid container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item xs={12}>
                    <Typography variant='h5' className='heading'>Create an account</Typography>
                    <Typography className='description'> </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Box className='box' >
                        <Typography className='box-title' mb='18px'>Sign up with</Typography>
                        <Stack direction='row' alignItems='center' justifyContent={'center'} spacing={2} px='48px'>
                            <Main />
                            <Button className='ggBtns' startIcon={googleIcon} onClick={handleGoogle}>
                                Google
                            </Button>
                        </Stack>
                        <Box my={'50px'}>
                            <Divider />
                        </Box>
                        <Box px='46px'>
                            {signUpError && <Alert sx={{ mb: '20px', '& .MuiPaper-root': { borderRadius: '10px' } }} severity="error">{signUpError}!</Alert>}
                            {signUpSuccess && <Alert sx={{ mb: '20px', '& .MuiPaper-root': { borderRadius: '10px' } }} severity="success">{signUpSuccess}!</Alert>}
                        </Box>
                        <Typography className='box-title' mb='18px'>Or sign up with credentials</Typography>

                        <Stack alignItems='center' justifyContent={'center'} spacing={2} px='48px' mb='40px'
                            id='signup' component='form' onSubmit={handleSubmit(handleSignUp)} noValidate
                        >
                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    placeholder='Name '
                                    fullWidth={true}
                                    type='text'
                                    name='name'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {nameIcon}
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    sx={styles.textField}
                                    {...register("name", { required: true, minLength: 3 })}
                                    error={errors.name}
                                />
                                {errors.name && <>{errors.name.type === 'minLength' ? ErrorText("Minimum Length 3 characters!") : ErrorText("Field is Required!")}</>}

                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    placeholder='Email'
                                    fullWidth={true}
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
                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    placeholder='Password'
                                    fullWidth={true}
                                    name='password'
                                    type={showPassword ? 'text' : "password"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <span onClick={() => setShowPassword(!showPassword)}>{passwordIcon}</span>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    sx={styles.textField}
                                    {...register('password', { required: true, minLength: 6 })}
                                    error={errors.password}
                                />
                                {errors.password && <>{errors.password.type === 'minLength' ? ErrorText("Minimum Length 6 characters!") : ErrorText("Field is Required!")}</>}
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Typography fontSize='15px'>password strength: strong</Typography>
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <FormControlLabel
                                    sx={{ '& span.MuiTypography-root': { fontSize: '14px' } }}
                                    error={true}
                                    fullWidth={true} control={<Checkbox
                                        name='agree'
                                        {...label}
                                        disableFocusRipple
                                        disableTouchRipple
                                        disableRipple
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 20, border: 0, color: '#ADB5BD' },
                                            '&.Mui-checked': { color: '#ADB5BD' },
                                        }}
                                    />} label="I agree with the Privacy Policys" />
                                {/* {errors.agree && <>{ErrorText("Please Check it!")}</>} */}
                            </Box>
                            <Button type='submit' variant='contained' className='submitBtn'>
                                Create account
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Stack mt='19px' direction={'row'} alignItems='center' justifyContent={'space-between'} sx={{ maxWidth: '540px', marginX: 'auto', }}>
                        <NavLink to='/login' style={{ fonSize: '13px', color: '#CED4DA', textDecoration: 'none' }}>Login Now</NavLink>
                        <NavLink to='/forgot-password' style={{ fonSize: '13px', color: '#CED4DA', textDecoration: 'none' }}>Forgot password?</NavLink>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignUp;

const googleIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1313 10.3346C19.1313 9.69529 19.0729 9.08003 18.9642 8.48999H10.3051V11.9786H15.2531C15.04 13.106 14.3921 14.061 13.4186 14.7007V16.9634H16.3899C18.1286 15.3931 19.1313 13.0811 19.1313 10.3346Z" fill="#4285F4" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3051 19.1486C12.7875 19.1486 14.8686 18.3411 16.3899 16.9634L13.4186 14.7007C12.5954 15.2418 11.542 15.5617 10.3051 15.5617C7.91033 15.5617 5.88374 13.9754 5.16069 11.8434H2.08887V14.1802C3.6016 17.1277 6.71082 19.1486 10.3051 19.1486Z" fill="#34A853" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.16074 11.8434C4.97686 11.3022 4.87246 10.724 4.87246 10.1298C4.87246 9.53557 4.97686 8.95737 5.16074 8.41625V6.07941H2.08892C1.46638 7.29693 1.11108 8.67458 1.11108 10.1298C1.11108 11.585 1.46638 12.9627 2.08892 14.1802L5.16074 11.8434Z" fill="#FBBC05" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3051 4.69794C11.6549 4.69794 12.8669 5.15308 13.8198 6.04654L16.4569 3.45977C14.8643 2.00493 12.7832 1.11108 10.3051 1.11108C6.71121 1.11108 3.6016 3.13227 2.08887 6.07941L5.16069 8.41625C5.88374 6.28462 7.91072 4.69794 10.3051 4.69794Z" fill="#EA4335" />
</svg>

const emailIcon = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7.42284 8.20313C7.2933 8.27452 7.1478 8.31196 6.99989 8.31196C6.85198 8.31196 6.70648 8.27452 6.57694 8.20313L0.4375 4.81622V11.1563C0.437847 11.5042 0.57624 11.8379 0.822306 12.0839C1.06837 12.33 1.40201 12.4684 1.75 12.4688H12.25C12.598 12.4684 12.9316 12.33 13.1777 12.0839C13.4238 11.8379 13.5622 11.5042 13.5625 11.1563V4.81622L7.42284 8.20313Z" fill="#ADB5BD" />
    <path d="M12.2505 1.53125H1.75049C1.4025 1.5316 1.06886 1.66999 0.822794 1.91606C0.576728 2.16212 0.438336 2.49576 0.437988 2.84375V3.9375C0.437973 3.97664 0.448459 4.01506 0.468351 4.04877C0.488243 4.08247 0.516813 4.11022 0.551082 4.12912L6.89483 7.62912C6.92719 7.64697 6.96354 7.65633 7.00049 7.65633C7.03744 7.65633 7.07379 7.64697 7.10614 7.62912L13.4499 4.12912C13.4842 4.11022 13.5127 4.08247 13.5326 4.04877C13.5525 4.01506 13.563 3.97664 13.563 3.9375V2.84375C13.5626 2.49576 13.4242 2.16212 13.1782 1.91606C12.9321 1.66999 12.5985 1.5316 12.2505 1.53125Z" fill="#ADB5BD" />
</svg>

const passwordIcon = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 5.03131C4.58369 5.03131 2.625 6.99 2.625 9.40631C2.625 11.8226 4.58369 13.7813 7 13.7813C9.41631 13.7813 11.375 11.8226 11.375 9.40631C11.375 6.99 9.41631 5.03131 7 5.03131ZM7.21875 10.0429V11.3751H6.78125V10.0429C6.16066 9.93853 5.6875 9.40019 5.6875 8.75006C5.6875 8.02512 6.27506 7.43756 7 7.43756C7.72494 7.43756 8.3125 8.02512 8.3125 8.75006C8.3125 9.40019 7.83934 9.93853 7.21875 10.0429Z" fill="#ADB5BD" />
    <path d="M4.59399 5.24125V3.0625C4.59399 1.73578 5.67353 0.65625 7.00024 0.65625C8.32696 0.65625 9.40649 1.73578 9.40649 3.0625H9.84399C9.84399 1.4945 8.56824 0.21875 7.00024 0.21875C5.43224 0.21875 4.15649 1.4945 4.15649 3.0625V5.52694C4.29671 5.42391 4.44284 5.32875 4.59399 5.24125Z" fill="#ADB5BD" />
</svg>

const nameIcon = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M13.6554 3.73932L7.09287 0.676819C7.03425 0.649475 6.96644 0.649475 6.90781 0.676819L0.345312 3.73932C0.268312 3.77519 0.219093 3.85241 0.219093 3.93751C0.219093 4.0226 0.268312 4.09982 0.345312 4.13569L6.90781 7.19819C6.93712 7.21197 6.96862 7.21876 7.00034 7.21876C7.03206 7.21876 7.06356 7.21197 7.09287 7.19819L9.40659 6.11844V11.7425L8.35353 13.2167C8.30606 13.2834 8.2995 13.3709 8.33712 13.4439C8.37453 13.5168 8.44956 13.5625 8.53159 13.5625H10.7191C10.8011 13.5625 10.8762 13.5168 10.9136 13.4439C10.951 13.3709 10.9446 13.2834 10.8972 13.2167L9.84409 11.7425V5.91435L13.6554 4.13569C13.7324 4.09982 13.7816 4.0226 13.7816 3.93751C13.7816 3.85241 13.7324 3.77519 13.6554 3.73932Z" fill="#ADB5BD" />
    <path d="M8.96895 6.80551L7.27779 7.59476C7.1916 7.63479 7.09557 7.65622 7.0002 7.65622C6.90482 7.65622 6.80879 7.63479 6.72239 7.59476L2.40645 5.58051V9.18747C2.40645 10.414 4.4242 11.375 7.0002 11.375C7.70982 11.375 8.3746 11.2999 8.96895 11.1685V6.80551Z" fill="#ADB5BD" />
    <path d="M10.2814 6.19304V10.7317C11.0965 10.3388 11.5939 9.79607 11.5939 9.18751V5.58032L10.2814 6.19304Z" fill="#ADB5BD" />
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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const ErrorText = text => <Typography sx={{ fontSize: '9px', color: 'red', marginBottom: '8px' }}>{text}</Typography>
