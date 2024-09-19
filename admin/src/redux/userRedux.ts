import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//  User interface
interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  isAdmin: boolean;
}

//UserState interface
interface UserState {
  currentUser: User | null; // currentUser can be null if no user is logged in
  isFetching: boolean;
  error: boolean;
}

// Initial state typed with UserState
const initialState: UserState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.currentUser = action.payload; 
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;  // Clear the user state
    },
  },
});

export const { loginStart, loginSuccess, loginFailure ,logout} = userSlice.actions;
export default userSlice.reducer;
