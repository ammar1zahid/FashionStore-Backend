import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User interface
interface User {
  _id?: string;
  username: string;
  firstName?: string; 
  lastName?: string;  
  email?: string;     
  phone?: string;     
  isAdmin: boolean;   
  img?: string;       
}

// UserState interface
interface UserState {
  currentUser: User | null; 
  users: User[]; // List of users
  isFetching: boolean;
  error: boolean;
}

// Initial state
const initialState: UserState = {
  currentUser: null,
  users: [],
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    start: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error on new operation
    },
    failure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    createUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    logout: (state) => {
      state.currentUser = null;  
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.isFetching = false;
      state.users = action.payload; 
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      if (state.currentUser && state.currentUser._id === action.payload._id) {
        state.currentUser = { ...state.currentUser, ...action.payload }; // Update current user
      }
      state.users = state.users.map(user =>
        user._id === action.payload._id ? action.payload : user // Update user in list
      );
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.users = state.users.filter(user => user._id !== action.payload); // Remove deleted user
    },
  },
});

export const {
  start,
  failure,
  loginSuccess,
  registerSuccess,
  logout,
  createUserSuccess,
  fetchUsersSuccess,
  updateUserSuccess,
  deleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
