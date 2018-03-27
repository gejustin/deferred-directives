import { ModuleWithProviders, NgModule } from '@angular/core';

import { BrowserOnloadEventProvider } from './browser-on-load-event.provider';
import { CallbackScheduler } from './callback-scheduler.service';
import { NextAnimationFrameDirective } from './next-frame.directive';
import { NextIdleCallbackDirective } from './next-idle.directive';
import { OnLoadDirective } from './on-load.directive';
import { WindowProvider } from './window.provider';

@NgModule({
    declarations: [
        NextIdleCallbackDirective,
        NextAnimationFrameDirective,
        OnLoadDirective,
    ],
    exports: [
        NextIdleCallbackDirective,
        NextAnimationFrameDirective,
        OnLoadDirective,
    ],
})
export class DeferredDirectivesModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: DeferredDirectivesModule,
            providers: [
                WindowProvider,
                BrowserOnloadEventProvider,
                CallbackScheduler,
            ],
        };
    }
}
