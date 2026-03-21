import type { HttpClient } from '../core/http-client.js';
import type { OtpAcceptRequest, OtpGetRequest, OtpLoginRequest, PasswordForgetRequest, PasswordResetRequest, RequestOptions, ResponsesApiV1AccountsOtpGet, ResponsesApiV1AccountsOtpLogin, ResponsesV1AccountsUsersAuthLogin, ResponsesV1AccountsUsersAuthLogout, ResponsesV1AccountsUsersAuthSocialAuthenticate, ResponsesV1AccountsUsersAuthSocialLogin, SocialAuthenticateQuery, UserLoginRequest, EnumsAccountsUsersUserSocialType } from '../models/types.js';
export declare class AuthApi {
    private readonly client;
    constructor(client: HttpClient);
    requestOtp(data: OtpGetRequest, options?: RequestOptions): Promise<ResponsesApiV1AccountsOtpGet>;
    acceptOtp(data: OtpAcceptRequest, options?: RequestOptions): Promise<void>;
    loginWithOtp(data: OtpLoginRequest, options?: RequestOptions): Promise<ResponsesApiV1AccountsOtpLogin>;
    login(data: UserLoginRequest, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthLogin>;
    getSocialLogin(provider: EnumsAccountsUsersUserSocialType, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthSocialLogin>;
    authenticateSocial(query: SocialAuthenticateQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthSocialAuthenticate>;
    logout(options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthLogout>;
    forgotPassword(data: PasswordForgetRequest, options?: RequestOptions): Promise<void>;
    resetPassword(data: PasswordResetRequest, options?: RequestOptions): Promise<void>;
}
