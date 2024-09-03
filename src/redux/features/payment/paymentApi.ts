import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: any }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "payments",
          method: "GET",
          params,
        };
      },
      providesTags: ["payments"],
    }),
    // createReview: builder.mutation({
    //   query: ( data) => {
    //     return {
    //       url: `reviews`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["review"],
    // }),
  }),
});

export const { useGetPaymentsQuery } = paymentApi;
