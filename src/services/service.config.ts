export interface FlutterwaveConfig {
    SECRET_KEY: string;
    PUBLIC_KEY: string;
}

export interface PaystackConfig {
    SECRET_KEY: string;
    PUBLIC_KEY: string;
}

export interface ServiceConfig {
    flutterwave: FlutterwaveConfig;
    paystack: PaystackConfig;
}