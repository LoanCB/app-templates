export type AuthErrorCodes = 'INVALID_TOKEN' | 'FORBIDDEN_ACCESS' | 'INVALID_CREDENTIALS';

export default (): { [key in AuthErrorCodes]: string } => ({
  INVALID_TOKEN: 'Expired or invalid access token',
  FORBIDDEN_ACCESS: 'Forbidden',
  INVALID_CREDENTIALS: 'Invalid credentials',
});
