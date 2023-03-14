import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { HelloWorldCommand } from "./Commands/HelloWorldCommand";
import { TextSummarizerCommand } from "./Commands/TextSummarizerCommand";

export class PracticeRocketChatApp extends App {
    appLogger: ILogger;
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {
        const helloWorldCommand: HelloWorldCommand = new HelloWorldCommand();
        const textSummarizerCommand: TextSummarizerCommand = new TextSummarizerCommand();
        await configuration.slashCommands.provideSlashCommand(
            helloWorldCommand
        );
        await configuration.slashCommands.provideSlashCommand(
            textSummarizerCommand
        );
    }
}
