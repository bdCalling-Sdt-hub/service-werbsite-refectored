import { baseApi } from "@/redux/api/baseApi";

const bitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postBit: builder.mutation({
      query: (data) => {
        return {
          url: `bits`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["bits"],
    }),
    getBits: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: any }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "bits",
          method: "GET",
          params,
        };
      },
      providesTags: ["bits"],
    }),
  }),
});

export const { useGetBitsQuery, usePostBitMutation } = bitsApi;
