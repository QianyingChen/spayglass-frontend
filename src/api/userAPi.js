import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// const apiUrl = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    // signin: builder.query({
    //   query: () => ({ 
    //     url: '/signin'
    //   })
    // }),
    userInfo: builder.query({
      query: () => '/userinfo'
    }),
    signout: builder.mutation({
      query: () => ({
        method: 'GET',
        url: '/signout'
      })
    })
  })
});

  export const {
    useSigninQuery,
    useUserInfoQuery,
    useSignoutMutation
  } = userApi;