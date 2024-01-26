import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { Payment } from "types/Payment";

const paymentsAdapter = createEntityAdapter({
  sortComparer: (a: Payment, b: Payment) =>
    b.createdAt.localeCompare(a.createdAt),
});

const initialState = paymentsAdapter.getInitialState();
export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => ({
        url: "/payments",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (responseData: Payment[]) => {
        const loadedPayments = responseData.map((payment) => {
          payment.id = String(payment._id);
          return payment;
        });
        return paymentsAdapter.addMany(initialState, loadedPayments);
      },

      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Payment" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({ type: "Payment" as const, id })),
          ];
        } else {
          return [{ type: "Payment" as const, id: "LIST" as const }];
        }
      },
    }),

    addNewPayment: builder.mutation({
      query: (initialPayment) => ({
        url: "/payments",
        method: "POST",
        body: {
          ...initialPayment,
        },
      }),
      invalidatesTags: (arg) => [{ type: "Payment" as const, id: arg.id }],
    }),

    updatePayment: builder.mutation({
      query: (initialPaymentData) => ({
        url: "/payments",
        method: "PATCH",
        body: {
          ...initialPaymentData,
        },
      }),
    }),

    deletePayment: builder.mutation({
      query: ({ id }) => ({
        url: `/payments`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (arg) => [{ type: "Payment" as const, id: arg.id }],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useAddNewPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApiSlice;

export const selectPaymentsResult =
  paymentApiSlice.endpoints.getPayments.select(undefined);

const selectPaymentsData = createSelector(
  selectPaymentsResult,
  (paymentsResult) => paymentsResult?.data
);

export const {
  selectAll: selectAllPayments,
  selectById: selectPaymentById,
  selectIds: selectPaymentIds,
} = paymentsAdapter.getSelectors(
  (state: RootState) => selectPaymentsData(state) ?? initialState
);
