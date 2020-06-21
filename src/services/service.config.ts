export interface FlutterwaveConfig {
    SECRET_KEY: string;
    PUBLIC_KEY: string;
}

export interface PaystackConfig {
    SECRET_KEY: string;
    PUBLIC_KEY: string;
}

export interface UserOptions {
    LockoutAccessCount: number;
    LockoutExpiryMinute: number;
    EmailConfirmationRequired: boolean;
    EnableLockoutForNewUsers: boolean;
}

export interface ServiceConfig {
    flutterwave?: FlutterwaveConfig;
    paystack?: PaystackConfig;
    userOptions?: UserOptions
}