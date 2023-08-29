import { publicRequest,userRequest } from "../requestMethods";
import { getOrderListSuccess, getOrderListFailure, getOrderListStart, deleteOrderStart, deleteOrderSuccess, deleteOrderFailure, updateOrderStatusStart, updateOrderStatusSuccess, updateOrderStatusFailure } from "./orderRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import { deleteUserListFailure, deleteUserListStart, deleteUserListSuccess, getUserListFailure, getUserListStart, getUserListSuccess, updateUserListFailure, updateUserListStart, updateUserListSuccess } from "./userListRedux";
import { loginStart, loginFailure, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // Xử lý lỗi 401 ở đây
      dispatch(loginFailure("Wrong credentials!"));
    } else {
      // Xử lý các lỗi khác ở đây
      console.log(err);
      dispatch(loginFailure("An error occurred."));
    }
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/product/findall");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id,dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};
export const updateProduct = async (id , product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/product/${id}`,product);
    dispatch(updateProductSuccess({id,product}));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product`,product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getUserList = async(dispatch)=>{
  dispatch(getUserListStart())
  try{
    const res = await userRequest.get("/users/findall")
    dispatch(getUserListSuccess(res.data))
  }catch(err){
    dispatch(getUserListFailure())
  }
}
export const deleteUserList = async(id,dispatch)=>{
  dispatch(deleteUserListStart())
  try{
    const rest = await userRequest.delete(`/users/${id}`)
    dispatch(deleteUserListSuccess(id))
  }catch(err){
    dispatch(deleteUserListFailure())
  }
}
export const updateUserList = async (id, user, dispatch) => {
  dispatch(updateUserListStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserListSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserListFailure());
  }
};

export const getOrderList = async (dispatch) => {
  dispatch(getOrderListStart());
  try {
    const res = await userRequest.get("/order/findall");
    dispatch(getOrderListSuccess(res.data));
  } catch (err) {
    dispatch(getOrderListFailure());
  }
};
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/order/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};
export const updateOrderStatus = async (id, order, dispatch) => {
  dispatch(updateOrderStatusStart());
  try {
    const res = await userRequest.put(`/order/status/${id}`, order);
    dispatch(updateOrderStatusSuccess({ id, order }));
  } catch (err) {
    dispatch(updateOrderStatusFailure());
  }
};