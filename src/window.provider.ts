import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Provider, InjectionToken } from '@angular/core';

export const WindowRef = new InjectionToken('WindowRef');

export function WindowRefFactory(platformId: any) {
    if (isPlatformBrowser(platformId)) {
        return window;
    }
    return null;
}

export const WindowProvider: Provider = {
    provide: WindowRef,
    useFactory: WindowRefFactory,
    deps: [
        PLATFORM_ID,
    ],
};
