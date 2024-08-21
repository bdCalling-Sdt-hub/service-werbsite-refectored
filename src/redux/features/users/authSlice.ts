import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TBusiness = {
  id: string;
  mainServiceId: string;
  mainService: {
    id: string;
    name: string;
  };
  website?: string;
  abn: string; // ABN (Australian Business Number) as a string
  license?: string;
  about: string;
  openHour: string;
  name: string;
  address: string;
  services: string[]; // Array of strings for services
  city: string;
  state: string;
  postalCode: string;
  mobile: string;
  phone?: string;
  facebook?: string;
  instagram?: string;
};
export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string | null;
  type: "ADMIN" | "USER" | "PROVIDER";
  image: string | null;
  isVerified: boolean;
  business: TBusiness | null;
};
type TAuthState = {
  user: null | TUser;
  isLoading: boolean;
  // token: null | string;
};

const initialState: TAuthState = {
  user: null,
  isLoading: true,
  // token: null,
};
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, isLoading } = action.payload;
      state.user = user;
      state.isLoading = isLoading;
      // state.token = token;
    },
    logout: (state) => {
      state.user = null;
      // state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth;
