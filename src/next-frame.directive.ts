import { Directive, Inject, OnDestroy, OnInit, TemplateRef, ViewContainerRef, Injectable } from '@angular/core';

import { AsyncQueue } from './async-queue';
import { NextFrameQueue } from './next-frame-queue.provider';
import { WindowRef } from '@app/core/platform-browser/window.service';

@Directive({
    selector: '[nextFrame]',
})
@Injectable()
export class NextAnimationFrameDirective implements OnInit, OnDestroy {

    public window: Window;
    private frameId: number;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private windowRef: WindowRef,
        @Inject(NextFrameQueue) private queue: AsyncQueue,
    ) {
        this.window = windowRef.nativeWindow;
     }

    public ngOnInit() {
        this.queue.push(new Promise(resolve => {
            this.frameId = this.window.requestAnimationFrame(() => {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
                resolve();
            });
        }));
    }

    public ngOnDestroy() {
        if (this.frameId) {
            this.window.cancelAnimationFrame(this.frameId);
        }
    }
}
