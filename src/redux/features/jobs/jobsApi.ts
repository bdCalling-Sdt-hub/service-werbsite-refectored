import { baseApi } from "@/redux/api/baseApi";

const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => {
        return {
          url: `jobs`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["job"],
    }),

    getjobs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: any }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "jobs",
          method: "GET",
          params,
        };
      },
      providesTags: ["business"],
    }),
    applyJob: builder.mutation({
      query: (data) => {
        return {
          url: `job-applications`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["job"],
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

export const { usePostJobMutation, useGetjobsQuery , useApplyJobMutation } = jobsApi;
