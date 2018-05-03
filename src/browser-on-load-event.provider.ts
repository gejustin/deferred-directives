import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Provider } from '@angular/core';

export const BrowserOnloadEvent = new InjectionToken<Promise<void>>('BrowserOnloadEvent');

export function BrowserOnloadEventFactory(platformId: any, document: Document) {
    if (isPlatformBrowser(platformId)) {
        return new Promise((resolve) => {
            let loaded = document.readyState === 'complete';

            function onLoad() {
                document.removeEventListener('load', onLoad);
                resolve();
            }

            if (!loaded) {
                document.addEventListener('load', onLoad);
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
        DOCUMENT,
    ],
};
