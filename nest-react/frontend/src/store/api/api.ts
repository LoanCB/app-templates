import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { goToLogin } from "../../config/navigation";
import { RootState } from "../store";
import { removeUser } from "../user-slice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const user = (getState() as RootState).user;

    if (user?.accessToken) {
      headers.set("Authorization", `Bearer ${user.accessToken}`);
    }

    return headers;
  },
});

const logoutErrors = ["Unauthorized", "Token expired"];
interface ApiError {
  message: string;
  error: number;
  statusCode: string;
}

const baseQueryWithCatchErrors: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).data) {
    const errorData = result.error.data as ApiError;

    if (logoutErrors.includes(errorData.message)) {
      api.dispatch(removeUser());
      goToLogin();
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithCatchErrors,
  tagTypes: ["users"],
  endpoints: () => ({}),
});
