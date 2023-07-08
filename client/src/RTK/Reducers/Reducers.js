import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';
const APIS = {
  login: '/api/login',
  signup: '/signup',
  forgot: '/forgot',
  resetpassword: '/resetpassword',
}



// ------------------All Asyn Reducers are below ------------------//
let initialState = {
  loading: false,
  currentUser: null,
  loginError: false,
  signUpError: false,
  forgotSuccess: false,
  forgotError: false,
  resetSuccess: false,
  resetError: false,
  resetToken: false,

}

// ________________ Asyn Functions for Calling __________________ //


// LoginFun
export const LoginFun = createAsyncThunk(
  'mainSlice/LoginFun',
  async ({ email, password }) => {
    const data = await axios.post(APIS.login, { email, password })
    return data.data;
  }
);


// SignUpFun
export const SignUpFun = createAsyncThunk(
  'mainSlice/SignUpFun',
  async ({ name, email, password }) => {
    const data = await axios.post(APIS.signup, { name, email, password })
    return data.data;
  }
);


// forgotFun
export const forgotFun = createAsyncThunk(
  'mainSlice/forgotFun',
  async ({ email }) => {
    const data = await axios.post(APIS.forgot, { email })
    return data.data;
  }
);

// ResetFun
export const ResetFun = createAsyncThunk(
  'mainSlice/ResetFun',
  async ({ password, token }) => {
    const data = await axios.post(APIS.resetpassword, { password, token })
    return data.data;
  }
);


// asyn setter
const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {

    LOGIN_WITH_GOOGLE_APPLE: (state, { payload }) => {
      state.currentUser = payload;
    },

    RESET_TOKEN: (state, { payload }) => {
      state.resetToken = payload;
      // state.openLoginBoxDesk = 'responded';
    },


    LOG_OUT: (state, { payload }) => {
      state.loginError = false;
      state.signUpSuccess = false;
      state.signUpError = false;
      state.forgotSuccess = false;
      state.forgotError = false;
      state.resetError = false;
      state.resetSuccess = false;
      state.currentUser = null;
    },

    CLEAR_OUT: (state, { payload }) => {
      state.loginError = false;
      state.signUpSuccess = false;
      state.signUpError = false;
      state.forgotSuccess = false;
      state.forgotError = false;
      state.resetError = false;
      state.resetSuccess = false;
    },
  },

  // thunk reducers Responses
  extraReducers: (builder) =>
    builder
      // LoginFun cases 
      .addCase(LoginFun.fulfilled, (state, { payload }) => {
        toast.dismiss();
        if (payload.success) {
          state.currentUser = payload?.user;
          state.loginError = false;
        } else {
          state.loginError = payload.message
        }
      })
      .addCase(LoginFun.rejected, (state, { error }) => {
        toast.dismiss();
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

      // SignUpFun 
      .addCase(SignUpFun.fulfilled, (state, { payload }) => {
        toast.dismiss();
        // console.log('-signUp', payload);
        if (payload.success) {
          state.signUpSuccess = payload.message
        } else {
          state.signUpError = payload.message
        }
      })
      .addCase(SignUpFun.rejected, (state, { error }) => {
        toast.dismiss();
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })


      // forgotFun
      .addCase(forgotFun.pending, (state) => {
        state.forgotloading = true;
      })
      .addCase(forgotFun.fulfilled, (state, { payload }) => {
        toast.dismiss();
        state.forgotloading = false;
        if (payload.success) {
          state.forgotSuccess = payload.message;
          // state.resetToken = payload.token;
        } else {
          state.forgotError = payload.message
        }
      })
      .addCase(forgotFun.rejected, (state, { error }) => {
        toast.dismiss();
        state.forgotloading = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

      // ResetFun
      .addCase(ResetFun.pending, (state) => {
        state.resetloading = true;
      })
      .addCase(ResetFun.fulfilled, (state, { payload }) => {
        toast.dismiss();
        state.resetloading = false;
        if (payload.success) {
          state.resetSuccess = payload.message;
          // state.resetToken = false;
          // state.openLoginBoxDesk = 'login';
          state.loginError = false;
          state.signUpError = false;
          state.forgotSuccess = false;
          state.forgotError = false;
        } else {
          state.resetError = payload.message
          state.forgotSuccess = false;
        }
      })
      .addCase(ResetFun.rejected, (state, { error }) => {
        toast.dismiss();
        state.resetloading = false;
        state.forgotSuccess = false;
        state.forgotError = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

})





export const {
  LOG_IN,
  SELECTED_PROFILE,

  LOGIN_WITH_GOOGLE_APPLE,
  RESET_TOKEN,
  LOG_OUT,
  CLEAR_OUT

} = mainSlice.actions;

// ------------------All Asyn Getter Setter Reducers Exporter ------------------//
export const mainReducer = mainSlice.reducer;

