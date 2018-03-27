import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { CallbackScheduler } from './callback-scheduler.service';

@Directive({
    selector: '[nextIdle]',
})
export class NextIdleCallbackDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private scheduler: CallbackScheduler,
    ) { }

    public ngOnInit() {
        this.scheduler.onNextIdle(() => {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        });
    }
}
