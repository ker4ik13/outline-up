import { AuthService, UserService } from "@/services/admin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUserDto } from "../types/user/CreateUser";
import { User } from "../types/user/User";

interface TInitialState {
  user: User;
  isAuth: boolean;
  isLoading: boolean;
  error: null | string;
}

const initialState: TInitialState = {
  user: {} as User,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth(state, action: { payload: boolean; type: string }) {
      state.isAuth = action.payload;
    },
    setUser(state, action: { payload: User; type: string }) {
      state.user = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get user
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      } else {
        state.isAuth = false;
        state.isLoading = false;
      }
    });
    builder.addCase(getUser.rejected, (state, action) => {
      const error: any = action.payload;
      state.error = error;
      state.isLoading = false;
    });

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {} as User;
      state.isAuth = false;
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      const error: any = action.payload;
      state.error = error;
      state.isLoading = false;
    });
  },
});

export const checkAuth = createAsyncThunk("user/chechAuth", async () => {
  try {
    const response = await UserService.getMe();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const registration = createAsyncThunk(
  "user/registration",
  async (user: CreateUserDto) => {
    try {
      const response = await AuthService.registration(user);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await AuthService.logout();
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await UserService.getMe();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const { setAuth, setUser, setLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
