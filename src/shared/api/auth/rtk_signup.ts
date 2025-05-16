import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REST_API_SERVER_URL, COMMAND_ID } from '../../constants';

export interface ISingUpResponse {
  token?: string;
}

export const rtk_signup = createApi({
  reducerPath: 'rtkSignup',
  baseQuery: fetchBaseQuery({ baseUrl: REST_API_SERVER_URL }),
  endpoints: (builder) => ({
    singUp: builder.mutation<ISingUpResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/signup',
        method: 'POST',
        body: JSON.stringify({ email, password, commandId: COMMAND_ID }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useSingUpMutation } = rtk_signup;
