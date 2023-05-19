import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    IUIKitResponse,
    UIKitInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { BasicModal } from "../modals/BasicModal";
import { PracticeRocketChatApp } from "../PracticeRocketChatApp";

export class ExecuteHandleBasicModal {
    constructor(
        private readonly app: PracticeRocketChatApp,
        private readonly read: IRead,
        private readonly http: IHttp,
        private readonly persistence: IPersistence,
        private readonly modify: IModify,
    ) {}

    public async handleBasicModal(context : UIKitInteractionContext): Promise<IUIKitResponse> {
        const modal = await BasicModal({
            modify: this.modify,
            read: this.read,
            persistence: this.persistence,
            http: this.http,
            uikitcontext: context,
        });
        return context.getInteractionResponder().openModalViewResponse(modal);
    }
}
