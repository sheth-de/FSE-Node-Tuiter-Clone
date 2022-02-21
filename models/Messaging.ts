import User from "./User";

export default class Messaging {
    private message: string='';
    private to: User | null=null;
    private from: User | null = null;
    private sentOn: Date = new Date();
};