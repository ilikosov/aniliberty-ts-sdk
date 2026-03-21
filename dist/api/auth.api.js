export class AuthApi {
    client;
    constructor(client) {
        this.client = client;
    }
    requestOtp(data, options) {
        return this.client.request({ method: 'POST', path: '/accounts/otp/get', body: data, ...options });
    }
    acceptOtp(data, options) {
        return this.client.request({ method: 'POST', path: '/accounts/otp/accept', body: data, ...options });
    }
    loginWithOtp(data, options) {
        return this.client.request({ method: 'POST', path: '/accounts/otp/login', body: data, ...options });
    }
    login(data, options) {
        return this.client.request({ method: 'POST', path: '/accounts/users/auth/login', body: data, ...options });
    }
    getSocialLogin(provider, options) {
        return this.client.request({ method: 'GET', path: `/accounts/users/auth/social/${provider}/login`, ...options });
    }
    authenticateSocial(query, options) {
        return this.client.request({ method: 'GET', path: '/accounts/users/auth/social/authenticate', query: query, ...options });
    }
    logout(options) {
        return this.client.request({ method: 'POST', path: '/accounts/users/auth/logout', ...options });
    }
    forgotPassword(data, options) {
        return this.client.request({ method: 'POST', path: '/accounts/users/auth/password/forget', body: data, ...options });
    }
    resetPassword(data, options) {
        return this.client.request({ method: 'POST', path: '/accounts/users/auth/password/reset', body: data, ...options });
    }
}
