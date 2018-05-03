export class AsyncQueue {

    private previousEvent: Promise<any> = Promise.resolve();

    public push(deferred: Promise<any>) {
        this.previousEvent = this.previousEvent.then(() => deferred);
    }
}
