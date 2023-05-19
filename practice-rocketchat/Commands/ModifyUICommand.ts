import {
    IRead,
    IPersistence,
    IHttp,
    IModify,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { BasicModal } from "../modals/BasicModal";

export class ModifyUICommand implements ISlashCommand {
    public command = "modify-ui";
    public i18nDescription = "";
    public providesPreview = false;
    public i18nParamsExample = "";

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence
    ): Promise<void> {
        const triggerId = context.getTriggerId();
        if (triggerId) {
            const modal = await BasicModal({
                modify: modify,
                read: read,
                persistence: persistence,
                http: http,
                slashcommandcontext: context,
            });
            await modify.getUiController().openModalView(
                modal,
                {
                    triggerId,
                },
                context.getSender()
            );
        }
    }
}
