import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

const FOCUSED_CLASS = 'focused';

@Directive({
  selector: '[appAnimatedInput]'
})
export class AnimatedInputDirective implements AfterViewInit, OnDestroy {
  @Input() focusedClass = FOCUSED_CLASS;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private zone: NgZone,
  ) { }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const inputOrSelf = this.getInputOrSelf();

      fromEvent(inputOrSelf, 'focus')
        .pipe(
          takeUntil(this.destroyed$)
        )
        .subscribe(() => {
          this.elRef.nativeElement.classList.add(this.focusedClass);
        });

      fromEvent(inputOrSelf, 'blur')
        .pipe(
          takeUntil(this.destroyed$)
        )
        .subscribe(() => {
          this.elRef.nativeElement.classList.remove(this.focusedClass);
        });
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getInputOrSelf(): HTMLElement | HTMLInputElement {
    if (this.elRef.nativeElement.firstChild) {
      return this.elRef.nativeElement.querySelector('input') || this.elRef.nativeElement;
    }

    return this.elRef.nativeElement;
  }
}
