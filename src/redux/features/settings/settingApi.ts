import { baseApi } from "../../api/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { [key: string]: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/app-data",
          method: "GET",
          params,
        };
      },
      providesTags: ["setting"],
    }),
    updateSettings: builder.mutation({
      query: (body) => ({
        url: "/app-data",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["setting"],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingApi;
