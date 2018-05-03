import { Component, ViewChild } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NextFrameQueueProvider } from './next-frame-queue.provider';
import { NextAnimationFrameDirective } from './next-frame.directive';
import * as sinon from 'sinon';

{
    describe('Directive: NextFrame', () => {
        let windowRef: MockWindowRef;
        let window: MockWindow;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    NextAnimationFrameDirective,
                    TestComponent,
                ],
                providers: [
                    { provide: WindowRef, useClass: MockWindowRef },
                    NextFrameQueueProvider,
                ],
            });

            windowRef = TestBed.get(WindowRef);
            window = windowRef.nativeWindow;
        });

        it('should not be in DOM initially', async(() => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            fixture.whenRenderingDone().then(() => {
                expect(fixture.debugElement.queryAll(By.css('div')).length).to.equal(0);
            });
        }));

        it('should be rendered on the next animation frame', async(() => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            window.flushRaf();

            fixture.whenRenderingDone().then(() => {
                expect(fixture.debugElement.queryAll(By.css('div')).length).to.equal(1);
                expect(fixture.nativeElement.innerText).to.equal('Hello, World!');
            });
        }));

        it('should remove animation frame callback from queue when destroyed', async(() => {
            const fixture = TestBed.createComponent(TestComponent);
            const dWin: Window = (fixture.componentInstance as TestComponent).directive.window;
            const spy = sinon.spy(dWin, 'cancelAnimationFrame');

            fixture.detectChanges();

            fixture.destroy();

            spy.should.have.been.called;
        }));
    });
}

class MockWindow {

    private rafQueue = [];

    private id = 0;

    public requestAnimationFrame(fn: Function) {
        this.rafQueue.push(fn);
        return ++this.id;
    }

    public cancelAnimationFrame(id: number) { }

    public flushRaf() {
        this.rafQueue.forEach(fn => fn());
    }

}

class MockWindowRef {
    public mockWindow: MockWindow;
    get nativeWindow(): MockWindow {
        return this.mockWindow;
     }

     constructor() {
         this.mockWindow = new MockWindow();
     }

}

@Component({
    selector: 'test-cmp',
    template: `<div *nextFrame>Hello, World!</div>`,
})
class TestComponent {
    @ViewChild(NextAnimationFrameDirective)
    public directive: NextAnimationFrameDirective;
}
