import { createSlice } from '@reduxjs/toolkit';

export const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    userlist: [],
    isFetching: false,
    error: false
  },
  reducers: {
    getUserListStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    getUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUserListFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteUserListStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex(item => item._id === action.payload.id),
        1
      );
    },
    deleteUserListFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserListStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.users[state.users.findIndex(item => item._id === action.payload.id)] = action.payload.user;
    },
    updateUserListFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    addUserListStart: state => {
      state.isFetching = true;
      state.error = false;
    },
    addUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addUserListFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const {
  getUserListStart,
  getUserListSuccess,
  getUserListFailure,
  deleteUserListStart,
  deleteUserListSuccess,
  deleteUserListFailure,
  updateUserListStart,
  updateUserListSuccess,
  updateUserListFailure
} = userListSlice.actions;

export default userListSlice.reducer;
