import { baseApi } from "@/redux/api/basiApi";

const oederApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
    }),

    getOrder: builder.query({
      query: () => "/orders",
    }),
  }),
});

export const { useGetOrderQuery, useRegisterMutation } = oederApi;
