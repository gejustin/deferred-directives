import { Injector, Provider } from '@angular/core';
import { IdleCallbackService } from '@legacy/components/utils/idleCallback/idleCallback.service';

export function IdleCallbackServiceFactory(injector: Injector) {
    return injector.get('frIdleCallback');
}

export const IdleCallbackServiceProvider: Provider = {
    provide: IdleCallbackService,
    useFactory: IdleCallbackServiceFactory,
    deps: [
        '$injector',
    ],
};
