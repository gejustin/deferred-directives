import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BrowserOnloadEvent } from './browser-on-load-event.provider';
import { OnLoadDirective } from './on-load.directive';

{
    describe('Directive: OnLoad', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OnLoadDirective,
                    TestComponent,
                ],
                providers: [
                    { provide: BrowserOnloadEvent, useFactory: () => new Promise(() => { }) },
                ],
            });
        });

        it('should not be in DOM initially', async(() => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            fixture.whenRenderingDone().then(() => {
                expect(fixture.debugElement.queryAll(By.css('div')).length).to.equal(0);
            });
        }));

        it('should be rendered when the browser load event has fired', async(() => {
            const fixture = TestBed
                .overrideProvider(BrowserOnloadEvent, { useValue: Promise.resolve() })
                .createComponent(TestComponent);

            fixture.detectChanges();

            fixture.whenRenderingDone().then(() => {
                expect(fixture.debugElement.queryAll(By.css('div')).length).to.equal(1);
                expect(fixture.nativeElement.innerText).to.equal('Hello, World!');
            });
        }));
    });
}

@Component({
    selector: 'test-cmp',
    template: `<div *onLoad>Hello, World!</div>`,
})
class TestComponent { }
