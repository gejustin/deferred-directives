import { Injectable, Inject } from "@angular/core";
import { WindowRef } from "./window.provider";

@Injectable()
export class CallbackScheduler {

    private previousRaf: Promise<any> = Promise.resolve();

    private previousIdle: Promise<any> = Promise.resolve();

    constructor(@Inject(WindowRef) private window: Window) { }

    public onNextFrame(fn) {
        this.previousRaf = this.previousRaf.then(() => new Promise(resolve => {
            this.window.requestAnimationFrame(() => {
                fn();
                resolve();
            });
        }));
    }

    public onNextIdle(fn) {
        this.previousIdle = this.previousIdle.then(() => new Promise(resolve => {
            (this.window as any).requestIdleCallback(() => {
                fn();
                resolve();
            });
        }));
    }
}