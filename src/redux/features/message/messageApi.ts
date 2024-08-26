import { baseApi } from "@/redux/api/baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `messages`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["portfolio"],
    }),
    getMessage: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: any }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "messages",
          method: "GET",
          params,
        };
      },
      providesTags: ["message"],
    }),
    // getSingleBunsiness: builder.query({
    //   query: (id) => {
    //     return {
    //       url: `businesses/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["message"],
    // }),
  }),
});

export const { useAddMessageMutation, useGetMessageQuery } = messageApi;
