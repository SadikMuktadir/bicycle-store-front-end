import { baseApi } from "@/redux/api/basiApi";

const getBicycleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBicycle: builder.query({
      query: ({
        searchTerm = "",
        priceRange,
        brand,
        model,
        category,
        availability,
      }) => {
        const params = new URLSearchParams();

        if (searchTerm) params.append("searchTerm", searchTerm);
        if (priceRange) {
          params.append("minPrice", priceRange[0]);
          params.append("maxPrice", priceRange[1]);
        }
        if (brand) params.append("brand", brand);
        if (model) params.append("model", model);
        if (category) params.append("category", category);
        if (availability !== undefined)
          params.append("availability", availability);

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    // Add a query for fetching a product by its ID
    getBicycleById: builder.query({
      query: (id) => `/products/${id}`, // API endpoint to fetch a single product by ID
    }),
  }),
});

export const { useGetBicycleQuery, useGetBicycleByIdQuery } = getBicycleApi;
