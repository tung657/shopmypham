import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    currentUser: null,
    isPending: false,
    isError: false,
    isLogged: false,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
      state.login.isPending = false;
      state.login.isError = false;
      state.login.isLogged = true;
    },
    loginFailure: (state) => { 
      state.login.isPending = false;
      state.login.isError = true;
      state.login.isLogged = false;
    }
  }
})

export const { loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;

