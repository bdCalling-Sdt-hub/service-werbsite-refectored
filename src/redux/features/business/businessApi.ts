import { baseApi } from "@/redux/api/baseApi";

const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (businessId) => ({
        url: `portfolios?businessId=${businessId}`,
      }),
      providesTags: ["portfolio"],
    }),
    // postPortfolio: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: `portfolios`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["portfolio"],
    // }),
    // deletePortfolio: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `portfolios/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["portfolio"],
    // }),
    getSingleBunsiness: builder.query({
      query: (id) => {
        return {
          url: `businesses/${id}`,
          method: "GET",
        };
      },
      providesTags: ["business"],
    }),
    // getSingleBunsiness: builder.query({
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

export const { useGetSingleBunsinessQuery } = businessApi;
