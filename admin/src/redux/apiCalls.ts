/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from "redux";
import { makeRequest } from "../axios.ts"; // Adjust the import based on your project structure
import { 
  loginFailure, 
  loginStart, 
  loginSuccess 
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
  _id?: string; // Optional for new products
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
  dispatch(loginStart());
  try {
    const res = await makeRequest.post("/auth/login", user);
    const isAdmin = res.data.isAdmin;
    console.log("Res", isAdmin);
    if (isAdmin) {
      dispatch(loginSuccess(res.data));
    } else {
      dispatch(loginFailure());
    }
  } catch (err) {
    console.log(err);
    dispatch(loginFailure());
  }
};

// Get products
export const getProducts = async (dispatch: AppDispatch): Promise<void> => {
  dispatch(getProductStart());
  try {
    const res = await makeRequest.get("/products"); 
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
     const res = await makeRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// Update product
export const updateProduct = async (id: string, product: Product, dispatch: AppDispatch): Promise<void> => {
  dispatch(updateProductStart());
  try {
    console.log("sent update: ", product)
     const res = await makeRequest.put(`/products/${id}`, product);
      console.log("Updated success ", res.data)
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




