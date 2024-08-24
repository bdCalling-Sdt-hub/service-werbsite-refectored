import { baseApi } from "@/redux/api/baseApi";

const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    getBunsiness: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: any }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "businesses",
          method: "GET",
          params,
        };
      },
      providesTags: ["business"],
    }),
  }),
});

export const { useGetSingleBunsinessQuery, useGetBunsinessQuery } = businessApi;
