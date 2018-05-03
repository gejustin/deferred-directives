import { Directive, Inject, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { IdleCallbackService } from '@legacy/components/utils/idleCallback/idleCallback.service';

import { AsyncQueue } from './async-queue';
import { NextIdleQueue } from './next-idle-queue.provider';

@Directive({
    selector: '[nextIdle]',
})
export class NextIdleCallbackDirective implements OnInit, OnDestroy {

    private idleId: number;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private idleCallbackSvc: IdleCallbackService,
        @Inject(NextIdleQueue) private queue: AsyncQueue,
    ) { }

    public ngOnInit() {
        this.queue.push(new Promise(resolve => {
            this.idleId = this.idleCallbackSvc.request(() => {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            });
        }));
    }

    public ngOnDestroy() {
        if (this.idleId) {
            this.idleCallbackSvc.cancel(this.idleId);
        }
    }
}
