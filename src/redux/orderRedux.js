import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOrderListStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderListSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrderListFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = state.orders.filter(
        (item) => item._id !== action.payload
      );

    },
    deleteOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    //Update
    updateOrderStatusStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderStatusSuccess: (state, action) => {
      state.isFetching = false;
      state.orders[
        state.orders.findIndex((item) => item._id === action.payload.id)
      ].status = action.payload.order.status;
    },
    updateOrderStatusFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getOrderListStart,
  getOrderListSuccess,
  getOrderListFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStatusStart,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,

} = orderSlice.actions;

export default orderSlice.reducer;
