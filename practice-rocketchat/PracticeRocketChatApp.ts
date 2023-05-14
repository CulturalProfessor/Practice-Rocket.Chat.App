import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
    IRead,
    IHttp,
    IPersistence,
    IModify,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    IUIKitResponse,
    UIKitBlockInteractionContext,
    UIKitInteractionContext,
    UIKitViewCloseInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { HelloWorldCommand } from "./Commands/HelloWorldCommand";
import { ExecuteHandleBasicModal } from "./handlers/ExecuteBasicModalHandler";

export class PracticeRocketChatApp extends App {
    appLogger: ILogger;
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
        this.appLogger = this.getLogger();
        this.appLogger.debug("Summ");
    }

    public async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {
        const helloWorldCommand: HelloWorldCommand = new HelloWorldCommand();
        await configuration.slashCommands.provideSlashCommand(
            helloWorldCommand
        );
    }

    public async ExecuteHandleBasicModalHandler(
        context: UIKitBlockInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        const handler = new ExecuteHandleBasicModal(
            this,
            read,
            http,
            persistence,
            modify,
        );
        return await handler.handleBasicModal(context);
    }
}
