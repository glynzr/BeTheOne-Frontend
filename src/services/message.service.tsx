import {
    Firestore,
    collection,
    getDocs,
    onSnapshot,
    getDoc,
    addDoc,
} from "firebase/firestore";
import { IChatText } from "../interfaces/chat_text";
import { auth } from "./fire_app";

export class MessageService {
    constructor(private readonly firestore: Firestore) {}

    private messages = collection(this.firestore, "messages");

    async getMessages(callback: any) {
        onSnapshot(this.messages, (snapshot) => {
            callback(snapshot.docs.map((data) => data.data()));
        });
    }

    async sendMessage(message: IChatText) {
        return addDoc(this.messages, message);
    }
}
