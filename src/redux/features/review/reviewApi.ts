import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `reviews?businessId=${id}`,
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
          url: "review",
          method: "GET",
          params,
        };
      },
      providesTags: ["message"],
    }),
  }),
});

export const { useGetReviewQuery , useAddReviewMutation } = reviewApi;
