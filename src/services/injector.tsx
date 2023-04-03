import { firestore } from "./fire_app";
import { MessageService } from "./message.service";

export class Injector {
    private constructor() {}

    static injectFirestore(classType: any) {
        return new classType(firestore);
    }
}
