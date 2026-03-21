export class AuthService {
    api;
    client;
    constructor(api, client) {
        this.api = api;
        this.client = client;
    }
    async requestOtp(deviceId, options) {
        return this.api.requestOtp({ device_id: deviceId }, options);
    }
    async acceptOtp(code, options) {
        await this.api.acceptOtp({ code }, options);
    }
    async login(login, password, options) {
        const response = await this.api.login({ login, password }, options);
        this.captureToken(response);
        return response;
    }
    async loginWithOtp(deviceId, code, options) {
        const response = await this.api.loginWithOtp({ device_id: deviceId, code }, options);
        this.captureToken(response);
        return response;
    }
    async getSocialLogin(provider, options) {
        return this.api.getSocialLogin(provider, options);
    }
    async authenticateSocial(state, options) {
        const response = await this.api.authenticateSocial({ state }, options);
        this.captureToken(response);
        return response;
    }
    async logout(options) {
        await this.api.logout(options);
        this.client.clearToken();
    }
    async forgotPassword(email, options) {
        await this.api.forgotPassword({ email }, options);
    }
    async resetPassword(token, password, passwordConfirmation, options) {
        await this.api.resetPassword({ token, password, password_confirmation: passwordConfirmation }, options);
    }
    setToken(token) {
        this.client.setToken(token);
    }
    clearToken() {
        this.client.clearToken();
    }
    captureToken(response) {
        if (!response || typeof response !== 'object') {
            return;
        }
        const token = this.findToken(response);
        if (token) {
            this.client.setToken(token);
        }
    }
    findToken(value) {
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
