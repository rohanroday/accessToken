import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:null,
    accessToken: null,
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, setUser } = authSlice.actions;
export default authSlice.reducer;