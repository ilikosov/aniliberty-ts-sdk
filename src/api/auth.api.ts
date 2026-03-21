import type { HttpClient, QueryParams } from '../core/http-client.js';
import type {
  OtpAcceptRequest,
  OtpGetRequest,
  OtpLoginRequest,
  PasswordForgetRequest,
  PasswordResetRequest,
  RequestOptions,
  ResponsesApiV1AccountsOtpGet,
  ResponsesApiV1AccountsOtpLogin,
  ResponsesV1AccountsUsersAuthLogin,
  ResponsesV1AccountsUsersAuthLogout,
  ResponsesV1AccountsUsersAuthSocialAuthenticate,
  ResponsesV1AccountsUsersAuthSocialLogin,
  SocialAuthenticateQuery,
  UserLoginRequest,
  EnumsAccountsUsersUserSocialType,
} from '../models/types.js';

export class AuthApi {
  public constructor(private readonly client: HttpClient) {}

  public requestOtp(data: OtpGetRequest, options?: RequestOptions): Promise<ResponsesApiV1AccountsOtpGet> {
    return this.client.request({ method: 'POST', path: '/accounts/otp/get', body: data, ...options });
  }
  public acceptOtp(data: OtpAcceptRequest, options?: RequestOptions): Promise<void> {
    return this.client.request({ method: 'POST', path: '/accounts/otp/accept', body: data, ...options });
  }
  public loginWithOtp(data: OtpLoginRequest, options?: RequestOptions): Promise<ResponsesApiV1AccountsOtpLogin> {
    return this.client.request({ method: 'POST', path: '/accounts/otp/login', body: data, ...options });
  }
  public login(data: UserLoginRequest, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthLogin> {
    return this.client.request({ method: 'POST', path: '/accounts/users/auth/login', body: data, ...options });
  }
  public getSocialLogin(provider: EnumsAccountsUsersUserSocialType, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthSocialLogin> {
    return this.client.request({ method: 'GET', path: `/accounts/users/auth/social/${provider}/login`, ...options });
  }
  public authenticateSocial(query: SocialAuthenticateQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthSocialAuthenticate> {
    return this.client.request({ method: 'GET', path: '/accounts/users/auth/social/authenticate', query: query as unknown as QueryParams, ...options });
  }
  public logout(options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthLogout> {
    return this.client.request({ method: 'POST', path: '/accounts/users/auth/logout', ...options });
  }
  public forgotPassword(data: PasswordForgetRequest, options?: RequestOptions): Promise<void> {
    return this.client.request({ method: 'POST', path: '/accounts/users/auth/password/forget', body: data, ...options });
  }
  public resetPassword(data: PasswordResetRequest, options?: RequestOptions): Promise<void> {
    return this.client.request({ method: 'POST', path: '/accounts/users/auth/password/reset', body: data, ...options });
  }
}
