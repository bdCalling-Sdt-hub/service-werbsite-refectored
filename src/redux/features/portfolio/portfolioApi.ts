import { baseApi } from "@/redux/api/baseApi";

const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (businessId) => ({
        url: `portfolios?businessId=${businessId}`,
      }),
      providesTags: ["portfolio"],
    }),
    postPortfolio: builder.mutation({
      query: (data) => {
        return {
          url: `portfolios`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["portfolio"],
    }),
    deletePortfolio: builder.mutation({
      query: (id) => {
        return {
          url: `portfolios/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["portfolio"],
    }),
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
  useGetPortfoliosQuery,
  usePostPortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
