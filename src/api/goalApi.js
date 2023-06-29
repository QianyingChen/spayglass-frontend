import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// const apiUrl = import.meta.env.VITE_API_URL;

export const goalApi = createApi({
  reducerPath: 'goalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include'
  }),
  endpoints: (builder) => ({
     
    getGoals: builder.query({
        query: () => '/goals'
      }),
    
    getGoal: builder.query({
        query: (id) => `/goals/${id}`
    }),

    uploadGoalImage: builder.mutation({
      query: ( {id, image} ) => {
                const formData = new FormData();
                formData.append('image', image, image.name);
        
                return {
                  url: `/goals/${id}/upload`,
                  method: 'POST',
                  body: formData,
                };
            }
        }),
    
    createGoal: builder.mutation({
        query: (goal) => {
          return {
            method: 'POST',
            url: '/goals',
            body: goal
          }
        }
      }),

      updateGoal: builder.mutation({
        query: goal => ({
            method: 'PUT',
            url: `/goals/${goal.id}`,
            body: goal
          })
      }),

      deleteGoal: builder.mutation({
        query: id => {
          return {
            method: 'DELETE',
            url: `/goals/${id}`,
          }
        }
      })
  })
});

export const {
  useGetGoalsQuery,
  useGetGoalQuery,
  useUploadGoalImageMutation,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation
} = goalApi;
