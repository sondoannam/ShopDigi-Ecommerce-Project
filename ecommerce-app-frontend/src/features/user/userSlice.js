import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService from "./userService";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await userService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await userService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/profile/update",
  async (userData, thunkAPI) => {
    try {
      return await userService.updateUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "user/find",
  async (id, thunkAPI) => {
    try {
      return await userService.getUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProductWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await userService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "user/cart/add",
  async (productData, thunkAPI) => {
    try {
      return await userService.addToCart(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "user/cart/get",
  async (thunkAPI) => {
    try {
      return await userService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/orders/get",
  async (thunkAPI) => {
    try {
      return await userService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeProductCart = createAsyncThunk(
  "user/cart/product/remove",
  async (id, thunkAPI) => {
    try {
      return await userService.removeProductFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductCart = createAsyncThunk(
  "user/cart/product/update",
  async (cartDetails, thunkAPI) => {
    try {
      return await userService.updateProductFromCart(cartDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const selectProductCart = createAsyncThunk(
  "user/cart/product/select",
  async (cartDetails, thunkAPI) => {
    try {
      return await userService.selectProductToCheckout(cartDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAnOrder = createAsyncThunk(
  "user/cart/create-order",
  async (data, thunkAPI) => {
    try {
      return await userService.createOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPassToken = createAsyncThunk(
  "user/password/token",
  async (data, thunkAPI) => {
    try {
      return await userService.forgotPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPass = createAsyncThunk(
  "user/password/reset",
  async (data, thunkAPI) => {
    try {
      return await userService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  user: getUserfromLocalStorage,
  cartProducts: [],
  cartProductsSelected: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const userSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      // getSelectedProduct: (state) => {
      //   const productSelected = state?.cartProducts?.filter(({ checked }) => checked === "Checked");
      //   //state?.cartProducts?.filter(({ checked }) => checked === "Checked")
      //   state.cartProductsSelected = productSelected;
      // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) toast.info("User Register Successfully");
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) toast.error("Something went wrong");
            })
            .addCase(login.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.user = action.payload;
              if (state.isSuccess === true) { 
                localStorage.setItem("token", action.payload.token);
                toast.info("Login Successfully!");
              }
            })
            .addCase(login.rejected, (state, action) => {
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
              state.isLoading = false;
              if (state.isError === true) toast.error("Login failed!");
            })
            .addCase(getUserProductWishlist.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.wishlist = action.payload;
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
            })
            .addCase(addProductToCart.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.cart = action.payload;
              if (state.isSuccess) toast.success('Product Added to Cart!');
            })
            .addCase(addProductToCart.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
            })
            .addCase(getUserCart.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.cartProducts = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
            })
            .addCase(removeProductCart.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(removeProductCart.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.removeProduct = action.payload;
              if (state.isSuccess) toast.success('Product is Removed from Cart')
            })
            .addCase(removeProductCart.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
              if (state.isError) toast.error('Something went wrong');
            })
            .addCase(updateProductCart.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(updateProductCart.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.updateProduct = action.payload;
              if (state.isSuccess) toast.success('Product Quantity Increased!');
            })
            .addCase(updateProductCart.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
              if (state.isError) toast.error('Something went wrong');
            })
            .addCase(selectProductCart.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(selectProductCart.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
            })
            .addCase(selectProductCart.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
              if (state.isError) toast.error('Something went wrong');
            })
            .addCase(createAnOrder.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(createAnOrder.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.createdOrder = action.payload;
              if (state.isSuccess) toast.success('Placing order successfully! Your request is pending...');
            })
            .addCase(createAnOrder.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
              if (state.isError) toast.error('Something went wrong');
            })
            .addCase(getOrders.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.getOrderedProducts = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
            })
            .addCase(updateProfile.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.updatedProfile = action.payload;
              if (state.isSuccess) toast.success('Your profile is updated successfully!');
            })
            .addCase(updateProfile.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
              if (state.isError) toast.error('Something went wrong... Try again later');
            })
            .addCase(forgotPassToken.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(forgotPassToken.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.passwordToken = action.payload;
              if (state.isSuccess) toast.success('We\'sent a notification to your email!');
            })
            .addCase(forgotPassToken.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
              if (state.isError) toast.error('Something went wrong... Try again later');
            })
            .addCase(resetPass.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(resetPass.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.passwordReset = action.payload;
              if (state.isSuccess) toast.success('Updated Password Successfully');
            })
            .addCase(resetPass.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
              if (state.isError) toast.error('Something went wrong... Try again later');
            })
            .addCase(getSingleUser.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(getSingleUser.fulfilled, (state, action) => {
              state.isError = false;
              state.isLoading = false;
              state.isSuccess = true;
              state.singleUser = action.payload;
            })
            .addCase(getSingleUser.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
            });
    }
});

//export const { getSelectedProduct } = userSlice.actions;

export default userSlice.reducer;