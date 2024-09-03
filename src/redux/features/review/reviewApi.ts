import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // review
    createReview: builder.mutation({
      query: (data) => {
        return {
          url: `reviews`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["review"],
    }),
    getReview: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: any }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "reviews",
          method: "GET",
          params,
        };
      },
      providesTags: ["message"],
    }),
    // communication
    getSingleCommunication: builder.query({
      query: (id) => {
        return {
          url: `communications/${id}`,
          method: "GET",
        };
      },
      providesTags: ["communication"],
    }),
  }),
});

export const {
  useGetReviewQuery,
  useGetSingleCommunicationQuery,
  useCreateReviewMutation,
} = reviewApi;
