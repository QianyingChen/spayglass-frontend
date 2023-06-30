import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URI,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    signin: builder.query({
      query: () => ({ 
        url: '/signin'
      })
    }),
    userInfo: builder.query({
      query: () => '/userinfo'
    }),
    signout: builder.mutation({
      query: () => ({
        method: 'POST',
        url: '/logout'
      })
    })
  })
});

  export const {
    useSigninQuery,
    useUserInfoQuery,
    useSignoutMutation
  } = userApi;