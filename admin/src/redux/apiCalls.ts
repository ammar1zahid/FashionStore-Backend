/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from "redux";
import { makeRequest } from "../axios.ts"; 
import { 
  failure, 
  start, 
  loginSuccess,
  createUserSuccess,
  fetchUsersSuccess,
  updateUserSuccess,
  deleteUserSuccess, 
} from "./userRedux";
import { 
  getProductStart, 
  getProductSuccess, 
  getProductFailure, 
  deleteProductStart, 
  deleteProductSuccess, 
  deleteProductFailure, 
  updateProductStart, 
  updateProductSuccess, 
  updateProductFailure, 
  addProductStart, 
  addProductSuccess, 
  addProductFailure 
} from "./productRedux.ts";

// Define User interface
interface User {
  username: string;
  password: string;
}

// Define Product interface
interface Product {
  _id?: string; 
  title: string;
  desc: string;
  img: string;
  categories?: string[];
  size?: string[];
  color?: string[];
  price: number;
  inventory: number;
  inStock: boolean;
}

// Define AppDispatch type
type AppDispatch = Dispatch;

// Login function
export const login = async (dispatch: AppDispatch, user: User): Promise<void> => {
  dispatch(start());
  try {
    const res = await makeRequest.post("/auth/login", user);
    const isAdmin = res.data.isAdmin;
    console.log("Res", isAdmin);
    if (isAdmin) {
      dispatch(loginSuccess(res.data));
    } else {
      dispatch(failure());
    }
  } catch (err) {
    console.log(err);
    dispatch(failure());
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async (user: any, dispatch: Dispatch) => {
  dispatch(start());
  try {
    const res = await makeRequest.post("/auth/register", user);
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(failure());
  }
};


// Fetch users
export const getUsers = async (dispatch: Dispatch) => {
  dispatch(start());
  try {
    const response = await makeRequest.get('/users');
  
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(failure());
  }
};

// Update a user
export const updateUser = async (id: string, userData: Partial<User>, dispatch: Dispatch) => {
  dispatch(start());
  try {
    const response = await makeRequest.put(`/users/${id}`, userData); 
    dispatch(updateUserSuccess(response.data));
  } catch (error) {
    console.log("Error: ",error)
    dispatch(failure());
  }
};

// Delete a user
export const deleteUser = async (id: string, dispatch: Dispatch) => {
  dispatch(start());
  try {
    await makeRequest.delete(`/users/${id}`); // Your API endpoint
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(failure());
  }
};

// Get products
export const getProducts = async (dispatch: AppDispatch): Promise<void> => {
  dispatch(getProductStart());
  try {
    const res = await makeRequest.get("/products/admin/get");
    
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

// Delete product
export const deleteProduct = async (id: string, dispatch: AppDispatch): Promise<void> => {
  dispatch(deleteProductStart());
  try {
    // You can uncomment the actual delete request if needed
     await makeRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// Update product
export const updateProduct = async (id: string, product: Product, dispatch: AppDispatch): Promise<void> => {
  dispatch(updateProductStart());
  try {
    
      await makeRequest.put(`/products/${id}`, product);
     
     dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    console.log("Error: ",err)
    dispatch(updateProductFailure());
  }
};

// Add new product
export const addProduct = async (product: Product, dispatch: AppDispatch): Promise<void> => {
  dispatch(addProductStart());
  try {
  
    const res = await makeRequest.post(`/products`, product); 

    dispatch(addProductSuccess(res.data)); 
  } catch (err) {
    dispatch(addProductFailure());
  }
};




