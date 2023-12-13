import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { apiSlice } from "app/api/apiSlice";

export type User = {
  [x: string]: string | boolean | string[];
  id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  roles: string[];
  isActive: boolean;
};

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData: User[]) => {
        const loadedUsers = responseData.map((user) => {
          user.id = String(user._id);
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "User" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({ type: "User" as const, id })),
          ];
        } else {
          return [{ type: "User" as const, id: "LIST" as const }];
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectusersResult =
  usersApiSlice.endpoints.getUsers.select(undefined);

const selectUsersData = createSelector(
  selectusersResult,
  (usersResult) => usersResult?.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state: RootState) => selectUsersData(state) ?? initialState
);
