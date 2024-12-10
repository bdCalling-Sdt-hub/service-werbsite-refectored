
import { baseApi } from "@/redux/api/baseApi";

const referallApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postRefer: builder.mutation({
      query: (data) => {
        return {
          url: `referrals`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["referral"],
    }),
    getReferrals: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: any }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "referrals",
          method: "GET",
          params,
        };
      },
      providesTags: ["referral"],
    }),
    // deletePortfolio: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `portfolios/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["portfolio"],
    // }),
    // getChartData: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item) => {
    //         params.append(item.name, item.value);
    //       });
    //     }
    //     return {
    //       url: "/payments/chart",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["earning"],
    // }),
  }),
});

export const { usePostReferMutation, useGetReferralsQuery } = referallApi;
