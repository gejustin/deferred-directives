import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IdleCallbackService } from '@legacy/components/utils/idleCallback';

import { NextIdleQueueProvider } from './next-idle-queue.provider';
import { NextIdleCallbackDirective } from './next-idle.directive';
import * as sinon from 'sinon';

{
    describe('Directive: NextIdle', () => {
        let idleSvc: MockIdleCallbackService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    NextIdleCallbackDirective,
                    TestComponent,
                ],
                providers: [
                    { provide: IdleCallbackService, useClass: MockIdleCallbackService },
                    NextIdleQueueProvider,
                ],
            });

            idleSvc = TestBed.get(IdleCallbackService);
        });

        it('should not be in DOM initially', async(() => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            fixture.whenRenderingDone().then(() => {
                expect(fixture.debugElement.queryAll(By.css('div')).length).to.equal(0);
            });
        }));

        it('should be rendered on the next idle callback', async(() => {
            const fixture = TestBed.createComponent(TestComponent);

            fixture.detectChanges();

            idleSvc.flushIdle();

            fixture.whenRenderingDone().then(() => {
                expect(fixture.debugElement.queryAll(By.css('div')).length).to.equal(1);
                expect(fixture.nativeElement.innerText).to.equal('Hello, World!');
            });
        }));

        it('should remove idle callback from queue when destroyed', async(() => {
            const fixture = TestBed.createComponent(TestComponent);
            const spy = sinon.spy(idleSvc, 'cancel');

            fixture.detectChanges();

            fixture.destroy();

            spy.should.have.been.called;
        }));
    });
}

class MockIdleCallbackService {

    private idleQueue = [];

    private id = 0;

    public request(fn: Function) {
        this.idleQueue.push(fn);
        return ++this.id;
    }

    public cancel(id: number) { }

    public flushIdle() {
        this.idleQueue.forEach(fn => fn());
    }

}

@Component({
    selector: 'test-cmp',
    template: `<div *nextIdle>Hello, World!</div>`,
})
class TestComponent { }
