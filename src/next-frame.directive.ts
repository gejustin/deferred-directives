import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { CallbackScheduler } from './callback-scheduler.service';

@Directive({
    selector: '[nextFrame]',
})
export class NextAnimationFrameDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private scheduler: CallbackScheduler,
    ) { }

    public ngOnInit() {
        this.scheduler.onNextFrame(() => {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        });
    }
}
