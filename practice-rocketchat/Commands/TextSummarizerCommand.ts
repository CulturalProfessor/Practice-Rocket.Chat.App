import {
    IHttp,
    IMessageBuilder,
    IModify,
    IModifyCreator,
    IPersistence,
    IPersistenceRead,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import {
    RocketChatAssociationModel,
    RocketChatAssociationRecord,
} from "@rocket.chat/apps-engine/definition/metadata";

export class TextSummarizerCommand implements ISlashCommand {
    public command = "summarize";
    public i18nDescription = "";
    public providesPreview = false;
    public i18nParamsExample = "";

    // query all records by room within the "scope" - message
    public static async findByRoom(
        persis: IPersistenceRead,
        room: IRoom
    ): Promise<Array<string>> {
        const associations: Array<RocketChatAssociationRecord> = [
            new RocketChatAssociationRecord(
                RocketChatAssociationModel.MISC,
                "message"
            ),
            new RocketChatAssociationRecord(
                RocketChatAssociationModel.ROOM,
                room.id
            ),
        ];

        let result: Array<string> = [];
        try {
            const records: Array<{ id: string }> =
                (await persis.readByAssociations(associations)) as Array<{
                    id: string;
                }>;

            if (records.length) {
                result = records.map(({ id }) => id);
            }
        } catch (err) {
            console.warn(err);
        }

        return result;
    }

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
        const persisRead: IPersistenceRead = read.getPersistenceReader();
        const messagesArray = await TextSummarizerCommand.findByRoom(
            persisRead,
            room
        );
        const messages = messagesArray.join(" ");
        const messageTemplate: IMessage = {
            text: messages,
            sender,
            room,
        };
        const messageBuilder: IMessageBuilder =
            creator.startMessage(messageTemplate);
        await creator.finish(messageBuilder);
    }
}
