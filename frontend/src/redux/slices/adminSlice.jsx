import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,           
  isAdminLoggedIn: false,  
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.admin = action.payload;  
      state.isAdminLoggedIn = true;  
    },
    logoutAdmin: (state) => {
      state.admin = null;             
      state.isAdminLoggedIn = false;  
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
