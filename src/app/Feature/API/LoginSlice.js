import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import CookieService from "../../../Services/CookiesServices";
import host from "../../../host/Host";

const initialState = {
  loading: false,
  data: null,
  error: false,
};

export const userLogin = createAsyncThunk("login/", async (user, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${host}/api/superAdmin/admin/login`,
      user
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const loginSlice = createSlice({
  initialState,
  name: "login",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;

      const user = action.payload.user;
      if (user) {
        localStorage.setItem("type", JSON.stringify(user.type));
        const date = new Date();
        const EXPIRE_AT_HOURS = 24;
        date.setTime(date.getTime() + EXPIRE_AT_HOURS * 60 * 60 * 1000); // 24 hours
        const options = { path: "/", expires: date };
        CookieService.set("jwt", user.api_token, options);
        toast.success(
          "تم تسجيل الدخول بنجاح. اكتملت عملية تسجيل الدخول بنجاح."
        );
      } else {
        toast.error("فشل تسجيل الدخول. البيانات غير متوفرة.");
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      const error = action.payload;

      if (error && error.status === 400) {
        toast.warning(
          "خطأ في الاتصال. فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى لاحقًا."
        );
      } else {
        toast.warning(
          "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك والمحاولة مرة أخرى."
        );
      }
    });
  },
});

export const selectLogin = (state) => state.login;
export default loginSlice.reducer;
