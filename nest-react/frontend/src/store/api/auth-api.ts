import { LoggedUser, UserDto } from "../../types/user/user.types";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoggedUser, UserDto>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
