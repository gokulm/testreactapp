import { filter, map, Observable, Subject } from "rxjs";
import { themes } from './theme-context';

export interface IMessage {
    channel: string;
    data: any;
}

export class Person {
    public name: string = "default"
    public address: string = "default"
    public age: number = 0;

    public constructor(init?: Partial<Person>) {
        Object.assign(this, init);
    }
}

export class Student {
    public name: string = "default"
    public address: string = "default"
    public age: number = 0;

    public constructor(init?: Partial<Student>) {
        Object.assign(this, init);
    }
}

export class ChangeThemeCommand {
    public theme: any = themes.dark;

    public constructor(init?: Partial<ChangeThemeCommand>) {
        Object.assign(this, init);
    }
}

export class MyInputEvent {
    public name: string = "default"

    public constructor(init?: Partial<MyInputEvent>) {
        Object.assign(this, init);
    }
}

export class MessagingService {
    private message$: Subject<IMessage>;
    static myInstance: MessagingService;

    constructor() {
        this.message$ = new Subject<IMessage>();
    }

    static getInstance() {
        if (!MessagingService.myInstance) {
            MessagingService.myInstance = new MessagingService();
        }

        return this.myInstance;
    }

    public publish<T>(message: T): void {
        const channel = ((message as any).constructor).name;
        this.message$.next({ channel: channel, data: message });
    }

    public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
        const channel = (messageType as any).name;
        return this.message$.pipe(
            filter((m: IMessage) => m.channel === channel),
            map((m: IMessage) => m.data)
        );
    }
}