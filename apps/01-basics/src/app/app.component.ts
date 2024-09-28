import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="p-6">
      <h1 class="text-xl font-bold mb-4">01 - Basics</h1>
      <div class="flex gap-4 items-center">
        <span>The current time is:</span>
        <pre class="text-xl">{{ currentTime() }}</pre>
      </div>
    </main>
  `,
})
export class AppComponent {
  currentTime = signal(this.getCurrentTime());

  constructor() {
    setInterval(() => this.updateTime(), 100);
  }

  private updateTime(): void {
    this.currentTime.set(this.getCurrentTime());
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString('nl-BE');
  }
}
