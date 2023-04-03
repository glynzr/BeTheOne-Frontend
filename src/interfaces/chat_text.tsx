export interface IChatText {
    id?: string | undefined;
    messages: string;
    userId: string;
    displayName: string;
    date: Date;
}
