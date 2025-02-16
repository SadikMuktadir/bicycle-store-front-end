import { baseApi } from "@/redux/api/basiApi";

const getBycleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBycle: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBycleQuery } = getBycleApi;
