import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const apiUrl = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    signin: builder.query({
      query: () => ({ 
        url: '/signin'
      })
    }),
    UserInfo: builder.query({
      query: () => ({
        url: '/userinfo'
      })
    })
  })
})

  export const {
    useSigninQuery,
    useUserInfoQuery
  } = userApi;