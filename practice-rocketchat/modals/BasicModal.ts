import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
    IUIKitInteractionParam,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    UIKitInteractionContext,
    UIKitSurfaceType,
} from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";

export async function BasicModal({
    modify
}: {
    modify: IModify;
    read: IRead;
    persistence: IPersistence;
    http: IHttp;
    uikitcontext?: UIKitInteractionContext;
}): Promise<IUIKitModalViewParam> {
    const block = modify.getCreator().getBlockBuilder();

    block.newPlainTextInputElement({
        actionId: "assignee",
        placeholder: block.newPlainTextObject("Assignee"),
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
