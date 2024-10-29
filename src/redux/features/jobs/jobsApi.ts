import { baseApi } from "@/redux/api/baseApi";

const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      providesTags: ["job"],
    }),
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
    getApplicationByJobId: builder.query({
      query: (id) => {
        return {
          url: `job-applications?jobId=${id}`,
          method: "GET",
        };
      },
      providesTags: ["job"],
    }),
    jobDelete: builder.mutation({
      query: (id: string) => {
        return {
          url: `jobs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["job"],
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetjobsQuery,
  useApplyJobMutation,
  useGetApplicationByJobIdQuery,
useJobDeleteMutation
} = jobsApi;
