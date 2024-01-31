import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { InstallmentPayment } from "types/InstallmentPayment";

const installmentPaymentsAdapter = createEntityAdapter({
  sortComparer: (a: InstallmentPayment, b: InstallmentPayment) =>
    b.createdAt.localeCompare(a.createdAt),
});

const initialState = installmentPaymentsAdapter.getInitialState();

export const installmentPaymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstallmentPayments: builder.query({
      query: () => ({
        url: "/installment-payments",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (responseData: InstallmentPayment[]) => {
        const loadedInstallmentPayments = responseData.map(
          (installmentPayment) => {
            installmentPayment.id = String(installmentPayment._id);
            return installmentPayment;
          }
        );
        return installmentPaymentsAdapter.addMany(
          initialState,
          loadedInstallmentPayments
        );
      },

      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "InstallmentPayment" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({
              type: "InstallmentPayment" as const,
              id,
            })),
          ];
        } else {
          return [{ type: "InstallmentPayment" as const, id: "LIST" as const }];
        }
      },
    }),

    getInstallmentPaymentsByPaymentId: builder.query({
      query: (paymentId) => ({
        url: `/installment-payments/${paymentId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (responseData: InstallmentPayment[]) => {
        const loadedInstallmentPayments = responseData.map(
          (installmentPayment) => {
            installmentPayment.id = String(installmentPayment._id);
            return installmentPayment;
          }
        );
        return installmentPaymentsAdapter.addMany(
          initialState,
          loadedInstallmentPayments
        );
      },

      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "InstallmentPayment" as const, id: "LIST" as const },
            ...result.ids.map((id) => ({
              type: "InstallmentPayment" as const,
              id,
            })),
          ];
        } else {
          return [{ type: "InstallmentPayment" as const, id: "LIST" as const }];
        }
      },
    }),

    addNewInstallmentPayment: builder.mutation({
      query: (initialInstallmentPaymentData) => ({
        url: "/installment-payments",
        method: "POST",
        body: {
          ...initialInstallmentPaymentData,
        },
      }),
    }),
    updateInstallmentPayment: builder.mutation({
      query: (initialInstallmentPaymentData) => ({
        url: "/installment-payments",
        method: "PATCH",
        body: {
          ...initialInstallmentPaymentData,
        },
      }),
    }),

    deleteInstallmentPayment: builder.mutation({
      query: ({ id }) => ({
        url: `/installment-payments`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (arg) => [
        { type: "InstallmentPayment" as const, id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetInstallmentPaymentsQuery,
  useGetInstallmentPaymentsByPaymentIdQuery,
  useAddNewInstallmentPaymentMutation,
  useUpdateInstallmentPaymentMutation,
  useDeleteInstallmentPaymentMutation,
} = installmentPaymentApiSlice;

export const selectInstallmentPaymentResult =
  installmentPaymentApiSlice.endpoints.getInstallmentPayments.select(undefined);

const selectInstallmentPaymentsData = createSelector(
  selectInstallmentPaymentResult,
  (installmentPaymentResult) => installmentPaymentResult?.data
);

export const {
  selectAll: selectAllInstallmentPayments,
  selectById: selectInstallmentPaymentById,
  selectIds: selectInstallmentIds,
} = installmentPaymentsAdapter.getSelectors(
  (state: RootState) => selectInstallmentPaymentsData(state) ?? initialState
);
