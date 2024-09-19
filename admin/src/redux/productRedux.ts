import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Product interface 
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

// products interface to handle an array of Product
interface ProductsState {
  products: Product[];  
  isFetching: boolean;
  error: boolean;
}

// Initial state typed with ProductsState
const initialState: ProductsState = {
  products: [],  
  isFetching: false,
  error: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action: PayloadAction<Product[]>) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      // Filter out the product with the matching id
      state.products = state.products.filter(item => item._id !== action.payload);
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPDATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (
      state, 
      action: PayloadAction<{ id: string; product: Product }>
    ) => {
      state.isFetching = false;
      const index = state.products.findIndex(item => item._id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload.product;
      }
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // ADD
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action: PayloadAction<Product>) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

// Export actions
export const {
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
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
