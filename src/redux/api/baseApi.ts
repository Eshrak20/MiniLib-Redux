import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://library-management-two-alpha.vercel.app/api/" }),
  tagTypes: ["Boi"],
  endpoints: () => ({}),
});
