import type { HttpClient } from '../core/http-client.js';
import type { AuthApi } from '../api/auth.api.js';
import type {
  EnumsAccountsUsersUserSocialType,
  RequestOptions,
  ResponsesApiV1AccountsOtpGet,
  ResponsesApiV1AccountsOtpLogin,
  ResponsesV1AccountsUsersAuthLogin,
  ResponsesV1AccountsUsersAuthSocialAuthenticate,
  ResponsesV1AccountsUsersAuthSocialLogin,
} from '../models/types.js';

export class AuthService {
  public constructor(
    private readonly api: AuthApi,
    private readonly client: HttpClient,
  ) {}

  public async requestOtp(deviceId: string, options?: RequestOptions): Promise<ResponsesApiV1AccountsOtpGet> {
    return this.api.requestOtp({ device_id: deviceId }, options);
  }

  public async acceptOtp(code: number, options?: RequestOptions): Promise<void> {
    await this.api.acceptOtp({ code }, options);
  }

  public async login(login: string, password: string, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthLogin> {
    const response = await this.api.login({ login, password }, options);
    this.captureToken(response);
    return response;
  }

  public async loginWithOtp(deviceId: string, code: number, options?: RequestOptions): Promise<ResponsesApiV1AccountsOtpLogin> {
    const response = await this.api.loginWithOtp({ device_id: deviceId, code }, options);
    this.captureToken(response);
    return response;
  }

  public async getSocialLogin(provider: EnumsAccountsUsersUserSocialType, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthSocialLogin> {
    return this.api.getSocialLogin(provider, options);
  }

  public async authenticateSocial(state: string, options?: RequestOptions): Promise<ResponsesV1AccountsUsersAuthSocialAuthenticate> {
    const response = await this.api.authenticateSocial({ state }, options);
    this.captureToken(response);
    return response;
  }

  public async logout(options?: RequestOptions): Promise<void> {
    await this.api.logout(options);
    this.client.clearToken();
  }

  public async forgotPassword(email: string, options?: RequestOptions): Promise<void> {
    await this.api.forgotPassword({ email }, options);
  }

  public async resetPassword(token: string, password: string, passwordConfirmation: string, options?: RequestOptions): Promise<void> {
    await this.api.resetPassword({ token, password, password_confirmation: passwordConfirmation }, options);
  }

  public setToken(token: string): void {
    this.client.setToken(token);
  }

  public clearToken(): void {
    this.client.clearToken();
  }

  private captureToken(response: unknown): void {
    if (!response || typeof response !== 'object') {
      return;
    }

    const token = this.findToken(response);
    if (token) {
      this.client.setToken(token);
    }
  }

  private findToken(value: unknown): string | undefined {
    if (!value || typeof value !== 'object') {
      return undefined;
    }

    for (const [key, nested] of Object.entries(value)) {
      if (typeof nested === 'string' && /token/i.test(key)) {
        return nested;
      }
      const child = this.findToken(nested);
      if (child) {
        return child;
      }
    }

    return undefined;
  }
}
