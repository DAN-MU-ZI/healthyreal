declare module 'stompjs' {
    export function over(socket: any): StompClient;
    export interface StompClient {
        connect(headers: any, callback: (frame: string) => void): void;
        subscribe(destination: string, callback: (message: any) => void): void;
        send(destination: string, headers: any, body: string): void;
        disconnect(callback?: () => void): void;
    }
}
