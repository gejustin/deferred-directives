import { InjectionToken, Provider } from '@angular/core';
import { AsyncQueue } from './async-queue';

export const NextIdleQueue = new InjectionToken('NextIdleQueue');

export const NextIdleQueueProvider: Provider = {
    provide: NextIdleQueue,
    useClass: AsyncQueue,
};
