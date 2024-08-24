import { baseApi } from "@/redux/api/baseApi";

const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getState: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `addresses/state`,
          method: "GET",
          params,
        };
      },
      providesTags: ["address"],
    }),
    getAddress: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `addresses`,
          method: "GET",
          params,
        };
      },
      providesTags: ["address"],
    }),
  }),
});

export const { useGetAddressQuery, useGetStateQuery } = addressApi;
