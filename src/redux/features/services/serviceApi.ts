import { baseApi } from "@/redux/api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "services",
          method: "GET",
          params,
        };
      },
      providesTags: ["service"],
    }),
  }),
});

export const {useGetServicesesQuery} = serviceApi;