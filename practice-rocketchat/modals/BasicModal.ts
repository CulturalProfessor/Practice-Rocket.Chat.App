import {
    IHttp,
    IModify,
    IPersistence,
    IRead
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    UIKitInteractionContext,
    UIKitSurfaceType,
} from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";

export async function BasicModal({
    modify,
}: {
    modify: IModify;
    read: IRead;
    persistence: IPersistence;
    http: IHttp;
    uikitcontext?: UIKitInteractionContext;
    slashcommandcontext?: SlashCommandContext;
}): Promise<IUIKitModalViewParam> {
    const block = modify.getCreator().getBlockBuilder();

    block.newPlainTextInputElement({
        actionId: "Vinayak",
        placeholder: block.newPlainTextObject("Hey"),
    });
    const value = {
        appId: "practice-rocketchat",
        id: "block-id",
        type: UIKitSurfaceType.MODAL,
        title: block.newPlainTextObject("Main Block"),
        blocks: block.getBlocks(),
        submit: block.newButtonElement({
            text: block.newPlainTextObject("Submit"),
        }),
    };
    return value;
}
