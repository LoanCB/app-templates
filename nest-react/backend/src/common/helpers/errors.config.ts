import commonErrorCodes, { AuthErrorCodes } from 'src/auth/helpers/auth-error-codes.config';
import userErrorCodes, { UserErrorCodes } from 'src/users/helpers/user-error-codes.config';
import authErrorCodes, { CommonErrorCodes } from './common-error-codes.config';

interface Args {
  [key: string]: string | number;
}

export type ErrorCode = UserErrorCodes | AuthErrorCodes | CommonErrorCodes;
export type DynamicMessage = (args: Args) => string;

export default () => ({
  ...userErrorCodes(),
  ...authErrorCodes(),
  ...commonErrorCodes(),
});
