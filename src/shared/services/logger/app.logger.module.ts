import {AppLogger} from "./app.logger";
import {Module} from "@nestjs/common";

@Module({
    providers: [AppLogger],
    exports: [AppLogger]
})
export class AppLoggerModule {}