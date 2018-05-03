import { InjectionToken, Provider } from '@angular/core';
import { AsyncQueue } from './async-queue';

export const NextFrameQueue = new InjectionToken('NextFrameQueue');

export const NextFrameQueueProvider: Provider = {
    provide: NextFrameQueue,
    useClass: AsyncQueue,
};
