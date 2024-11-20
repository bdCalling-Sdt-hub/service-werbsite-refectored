import { use } from 'react';
import { baseApi } from "@/redux/api/baseApi";

const promotionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postPromotion: builder.mutation({
      query: (data) => {
        return {
          url: `promotions`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["promotion"],
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

export const {
    usePostPromotionMutation
} = promotionApi;
