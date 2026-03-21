import type { HttpClient } from '../core/http-client.js';
import type { AuthApi } from '../api/auth.api.js';
import type { EnumsAccountsUsersUserSocialType, RequestOptions, ResponsesApiV1AccountsOtpGet, ResponsesApiV1AccountsOtpLogin, ResponsesV1AccountsUsersAuthLogin, ResponsesV1AccountsUsersAuthSocialAuthenticate, ResponsesV1AccountsUsersAuthSocialLogin } from '../models/types.js';
export declare class AuthService {
    private readonly api;
    private readonly client;
    constructor(api: AuthApi, client: HttpClient);
    requestOtp(deviceId: string, options?: RequestOptions): Promise<ResponsesApiV1AccountsOtpGet>;
    acceptOtp(code: number, options?: RequestOptions): Promise<void>;
    login(login: string, password: string, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthLogin>;
    loginWithOtp(deviceId: string, code: number, options?: RequestOptions): Promise<ResponsesApiV1AccountsOtpLogin>;
    getSocialLogin(provider: EnumsAccountsUsersUserSocialType, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthSocialLogin>;
    authenticateSocial(state: string, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthSocialAuthenticate>;
    logout(options?: RequestOptions): Promise<void>;
    forgotPassword(email: string, options?: RequestOptions): Promise<void>;
    resetPassword(token: string, password: string, passwordConfirmation: string, options?: RequestOptions): Promise<void>;
    setToken(token: string): void;
    clearToken(): void;
    private captureToken;
    private findToken;
}
