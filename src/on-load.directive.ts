import { Directive, Inject, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { BrowserOnloadEvent } from './browser-on-load-event.provider';

@Directive({
    selector: '[onLoad]',
})
export class OnLoadDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        @Inject(BrowserOnloadEvent) private onload: Promise<any>,
    ) { }

    public ngOnInit() {
        this.onload.then(() => {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        });
    }
}
