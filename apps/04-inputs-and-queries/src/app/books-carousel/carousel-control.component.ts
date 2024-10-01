import { AswButtonDirective } from '@angular-signals-workshop/shared-ng-ui/button';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'carousel-control',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AswButtonDirective],
  template: `
    <div class="flex gap-4">
      <button aswButton (click)="prev.emit()">Previous</button>
      <button aswButton (click)="next.emit()">Next</button>
    </div>
  `,
})
export class CarouselControlComponent {
  next = output();
  prev = output();
}
