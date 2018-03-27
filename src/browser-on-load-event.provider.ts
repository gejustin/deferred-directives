import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Provider } from '@angular/core';

import { WindowRef } from './window.provider';

export const BrowserOnloadEvent = new InjectionToken('BrowserOnloadEvent');

export function BrowserOnloadEventFactory(platformId: any, window: Window) {
    if (isPlatformBrowser(platformId)) {
        return new Promise((resolve) => {

            function onLoad() {
                window.removeEventListener('load', onLoad);
                resolve();
            }

            if (window.document.readyState !== 'complete') {
                window.addEventListener('load', onLoad);
            } else {
                resolve();
            }
        });
    }
    return Promise.resolve();
}

export const BrowserOnloadEventProvider: Provider = {
    provide: BrowserOnloadEvent,
    useFactory: BrowserOnloadEventFactory,
    deps: [
        PLATFORM_ID,
        WindowRef,
    ],
};
