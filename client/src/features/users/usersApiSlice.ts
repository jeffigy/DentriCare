import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { apiSlice } from "app/api/apiSlice";
import { User } from "types/User";
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
        } else return [{ type: "User" as const, id: "LIST" as const }];
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User" as const, id: "LIST" as const }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (arg) => [{ type: "User" as const, id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "User" as const, id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

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
