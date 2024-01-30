import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store";
import { setCredentials } from "features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      console.log("refreshresult: ", refreshResult.data);

      const accessToken = refreshResult.data as string;
      api.dispatch(setCredentials({ accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        (refreshResult.error.data as { message: string }).message =
          "Your login has expired. ";
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Patient",
    "User",
    "Procedure",
    "DentalNote",
    "Appointment",
    "Payment",
    "InstallmentPayment",
  ],
  endpoints: (builder) => ({}),
});
