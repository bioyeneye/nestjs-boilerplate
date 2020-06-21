import {UserService} from "./app_services/user.service";
import {AuthService} from "./app_services/auth.service";
import {JwtStrategy} from "./thirdparty_services/jwt.strategy";

export const applicationservices = [
    UserService,
    AuthService
];

export const thirdpartyservices = [
    JwtStrategy,
];