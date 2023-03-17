import {
    IHttp,
    IMessageBuilder,
    IModify,
    IModifyCreator,
    IPersistence,
    IPersistenceRead,
    IRead,
    ILogger,
    IRoomRead,
    IAppAccessors,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import {
    RocketChatAssociationModel,
    RocketChatAssociationRecord,
} from "@rocket.chat/apps-engine/definition/metadata";
import { TextSummary } from "../OpenAI";

export class TextSummarizerCommand implements ISlashCommand {
    public command = "summarize";
    public i18nDescription = "";
    public providesPreview = false;
    public i18nParamsExample = "";
    public appLogger: ILogger;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const creator: IModifyCreator = modify.getCreator();
        const sender: IUser = (await read
            .getUserReader()
            .getAppUser()) as IUser;
        const room: IRoom = context.getRoom();
        console.log("hey");

        const appAccessor: IRoomRead = read.getRoomReader();
        const messages: Array<IMessage> = [
            ...(await appAccessor.getMessages(room.id)),
        ];
        console.log(messages);
        messages.join();

        const result= await TextSummary(messages);
        const messageTemplate: IMessage = {
            text: "summarizer",
            sender,
            room,
        };
        const messageBuilder: IMessageBuilder =
            creator.startMessage(messageTemplate);
        await creator.finish(messageBuilder);
    }
}
