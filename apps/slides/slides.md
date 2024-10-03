---
theme: seriph
#background: https://cover.sli.dev
title: Angular Signals
transition: slide-left
---

# Angular Signals

<p class="pb-32 opacity-75! text-xl">Concepts, best practices and patterns.</p>

<div class="absolute bottom-8 left-0 w-full opacity-50">
  <p class="text-sm italic">Presented with ❤️ by Grizzly devs</p>
</div>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #FA2C04 0%, #0546FF 100%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  font-size: 5rem !important;
  line-height: 2 !important;
}
</style>


---
transition: fade-out
---

# What is a signal?

Let's start with a definition.

<div v-click>
  <p>A <span v-mark.red="+1">reactive</span> value which notifies consumers of any changes.</p>
</div>

<div v-click>
  <p>Signals are <span v-mark.red="+2">functions</span> which return their current value.</p>
</div>

<div v-click>
  <p>To access the current value of a signal: <span v-mark.red="+3">call it</span>.</p>
</div>

<br>

<v-click>

````md magic-move {lines:true}
```ts {1|4}
import { signal } from '@angular/core';

export class MyComponent {
  project = signal('Grizzly'); // WritableSignal<string>
}
```
```ts {6}
import { signal } from '@angular/core';

@Component({
  template: `
    I am currently working on:
    {{ project() }}
  `,
})
export class MyComponent {
  project = signal('Grizzly'); // WritableSignal<string>
}
```
````

</v-click>

---
transition: slide-left
---

# Why do we need them?

This question inevitably leads us to the topic of Change Detection.

<div v-click>
  Angular can <span v-mark.red="+1">track</span> where the signal is used.
</div>

<div v-click>
  By <span v-mark.red="+2">reacting</span> to the Signals, Angular knows exactly <span v-mark.red="+3">what to update and when</span>.
</div>

<br>

<div v-click="4">
  🔓 <span v-mark.red="+4" class="text-lg font-bold">Local Change Detection</span>: <span class="text-sm">Angular knows exactly which components should be re-rendered.</span>
</div>

<br>


```ts {1,4,7,11}{lines:true}
import { signal } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    I am currently working on:
    {{ project() }}
  `,
})
export class MyComponent {
  project = signal('Grizzly'); // WritableSignal<string>
}
```

---
transition: slide-left
---

# Modify Signal Value

How to modify the value of a signal?

A `WritableSignal` can be updated with a new value in 2 ways:

<v-click>

#### 1. Directly set the signal to a new value

````md magic-move {lines:true}
```ts {*|5|none|none}
selectedItemId = signal(0);

selectItem(id: string) {
  log(`Updating selected item...`)
  this.selectedItemId.set(id);
}

```
````

</v-click>

<br>

<v-click at="3">

#### 2. Update the value based on its current value

````md magic-move {at:4, lines:true}
```ts {*|5}
counter = signal(0);

increment() {
  log(`Updating counter...`)
  this.counter.update((currentCount) => currentCount + 1);
}

```
````

</v-click>



---
transition: slide-left
---

# Hands-On Time

## Clone repo

To get started, clone the repo:

```bash
git clone https://github.com/kfrederix/angular-signals-workshop.git
cd angular-signals-workshop
pnpm i
```

[https://github.com/kfrederix/angular-signals-workshop](https://github.com/kfrederix/angular-signals-workshop)

![QR code for Angular Signals Workshop github repo](./images/repo_qr-code.png "Angular Signals Workshop repo")

<style>
  img[alt="QR code for Angular Signals Workshop github repo"] {
    height: 150px;
  }
</style>


---
transition: slide-left
---

# Excercise 1 - The Basics

## Instructions

https://github.com/kfrederix/angular-signals-workshop#exercises

The instructions for each exercise can be found in the corresponding `README.md` file in each app folder.

```
apps
│
└── 01-basics
    │   ...
    ├── README.md
    ...

```

<br>


## Run app

```bash
pnpm start basics
```

---
transition: slide-left
---

# Reactive Derived Values

Signals are cool, but _derived signals_ are even better 😎

<p class="text-sm">What if we need a <span class="italic">derived</span> value that is always up-to-date when the signal changes?</p>


````md magic-move {at:1, lines:true}
```ts {1-6|1-7,10|1-7,10}
import { computed, signal } from '@angular/core';

counter: WritableSignal<number> = signal(0);

// DERIVED from this.counter - NOT writable
doubleCount: Signal<number> = computed(() => this.counter() * 2);

increment() {
  log(`Updating counter...`)
  this.counter.update((currentCount) => currentCount + 1 );
}

```
````

<br>

<v-click at="2">

## Extra Features

- Lazy Evaluation - <span class="text-sm opacity-50">only runs when value is read</span>
- Memoization - <span class="text-sm opacity-50">cached until source signal(s) changed</span>

</v-click>


---
transition: slide-left
---

# Reactive Derived Values

<br>

## 2 Rules for `computed()`:

<br>

### 1. Do not modify things

<br>

- No side-effects - <span class="text-sm opacity-75">No mutations of class properties, no `.next()` on Subject's etc...</span>
- Should be a **pure** function - <span class="text-sm opacity-75">Compute a new result, that's it.</span>


<br>

### 2. No asynchronous code

<br>

- No `setTimeout()`
- No `Promise`
- Only synchronous code - <span class="text-sm opacity-75">`computed()` can _not_ track asynchronous code</span>


---
transition: slide-left
---

# Reactive Derived Values - Pitfall

Watch out with conditional logic inside `computed()`

<div class="text-sm">When <span v-mark.red="+1">initial execution</span> of computed function does not <span v-mark.red="+1">read the signal</span>,</div>
<div class="text-sm">Angular can not track it.</div>

<br>

```ts {1-12}{lines: true}
counter = signal(0);
shouldDouble = false;

// does NOT work
doubleCountOrZero = computed(() => {
  if (!shouldDouble) {
    // in this case: no signal was read
    // so Angular does not know that this fn depends on count()
    return 0;
  }
  return this.count() * 2;
});

increment() {
  log(`Updating counter...`)
  this.counter.update((currentCount) => currentCount + 1 );
}

```

---
transition: slide-left
---

# Best-Practice Pattern For `computed()`

Avoid suprises (bugs) by applying this pattern.

<br>

````md magic-move {lines:true}
```ts
counter = signal(0);

doubleCount = computed(() => {
  // 1. read all signals first
  const count = this.counter();

  // 2. computation here - no more signal reads
  return count * 2;
});

```
```ts
counter = signal(0);

// OK to skip it for really simple one-liners
doubleCount = computed(() => this.counter() * 2);

```
```ts {*|1-2,6-7,9,14}
// BAD EXAMPLE - AVOID THIS
reallyAwesomeThing = computed(() => this.reallyAwesomeCalculation());

private reallyAwesomeCalculation() {
  return [
    this.firstThing(),
    this.secondThing(),
  ]
  .map((thing) => this.combineWithThirdThing(thing))
  .reduce((prevResult, currentVal) => prevResult + currentVal, 0);
}

private combineWithThirdThing(value) {
  return value * this.thirdThing();
}

```
```ts
// BETTER - MAKE SOURCE SIGNALS EXPLICIT
reallyAwesomeThing = computed(() => {
  // 1. read all source signals
  const firstThing = this.firstThing();
  const secondThing = this.secondThing();
  const thirdThing = this.thirdThing();

  // 2. pass plain values as arguments
  return this.reallyAwesomeCalculation(firstThing, secondThing, thirdThing);
});

private reallyAwesomeCalculation(firstThing, secondThing, thirdThing) {
  // NO more signal reads here
}

```
```ts
// BEST - NO ADDITIONAL CLASS METHOD CALLS
reallyAwesomeThing = computed(() => {
  // 1. read all the signals
  const firstThing = this.firstThing();
  const secondThing = this.secondThing();
  const thirdThing = this.thirdThing();
  
  // 2. computation here - no more signal reads
  return [firstThing, secondThing]
    .map((thing) => thing * thirdThing)
    .reduce((prevResult, currentVal) => prevResult + currentVal, 0);
});

```
```ts
import { reallyAwesomeCalculation } from './awesome-stuff.util';

export class MyCompponent {
  // BEST - No additional CLASS METHOD calls
  reallyAwesomeThing = computed(() => {
    // 1. read all the signals
    const firstThing = this.firstThing();
    const secondThing = this.secondThing();
    const thirdThing = this.thirdThing();
    
    // 2. computation here - no more signal reads
    return reallyAwesomeCalculation(firstThing, secondThing, thirdThing);
  });
}

```
````


---
transition: slide-left
---

# Excercise 2 - Derived Values

## Instructions

https://github.com/kfrederix/angular-signals-workshop#exercises

```
apps
│
└── 02-derived-values
    │   ...
    ├── README.md
    ...

```

<br>

## Run app

```bash
pnpm start derived-values
```


---
transition: fade-out
---

# Effect

Execute some side-effects when one or more signal values change.

- Runs at least once
- Tracks any signal value reads
- Executes asynchronously - <span class="text-sm opacity-50">during change detection process</span>

<br>


```ts {*}{lines: true}
import { effect } from '@angular/core';

effect(() => {
  // runs on component init, PLUS each time when count changes
  log(`The current count is: ${count()}`);
});

```

---
transition: slide-left
---

# Effect

Rarely needed in most apps. Use with care.


## Discouraged

❌ Usage of `effect()` is generally discouraged by Angular team.

💡 First consider if `computed()` could be a better fit.

<v-click>

## Example Use Cases

<br>

- Logging
- Syncing data with `window.localStorage`
- Custom DOM behavior - <span class="text-sm opacity-50">like changing background color based on State</span>
- Custom rendering - <span class="text-sm opacity-50">like drawing on a canvas whenever a signal changes</span>

</v-click>


---
transition: slide-left
---

# Non-reactive signal reads: `untracked()`

Can we read a signal from `effect()` or `computed()` without creating a dependency?


````md magic-move {lines:true}
```ts {*}
import { untracked } from '@angular/core';

// untracked(nonReactiveReadsFn: () => T): T

export class MyCompponent {
  counter1 = signal(0);
  counter2 = signal(0);

  constructor() {
    // Executes when `counter1` changes, not when `counter2` changes:
    effect(() => log(this.counter1(), untracked(this.counter2));
  }
}
```
```ts {*}
import { untracked } from '@angular/core';

export class MyCompponent {
  counter1 = signal(0);
  counter2 = signal(0);

  constructor() {
    // Executes when `counter1` changes, not when `counter2` changes:
    effect(() => log(this.counter1(), untracked(this.counter2));
  }

  this.counter1.set(1); // logs 1 0
  // ...
  this.counter2.set(1); // does not log
  // ...
  this.counter2.set(2); // does not log
  // ...
  this.counter2.set(3); // does not log
  // ...
  this.counter1.set(2); // logs 2 3
}
```
```ts {8-17}
import { untracked } from '@angular/core';

export class MyCompponent {
  counter1 = signal(0);
  counter2 = signal(0);

  constructor() {
    // BEST-PRACTICE PATTERN
    effect(() => {
      // 1. read signals that should be DEPENDENCIES
      const count1 = this.counter1();

      // 2. wrap side-effect logic in untracked()
      untracked(() => {
        log(count1, this.counter2()); // counter2 will not be tracked!
      });
    });
  }
}
```

```ts {1,8-12}
import { explicitEffect } from 'ngxtension/explicit-effect';

export class MyCompponent {
  counter1 = signal(0);
  counter2 = signal(0);

  constructor() {
    // RECOMMENDED:
    // use explicitEffect() to enforce best-practice pattern with minimal code
    explicitEffect([this.counter1], ([count1]) => {
      log(count1, this.counter2()); // counter2 will not be tracked!
    });
  }
}
```
````


---
transition: slide-left
---

# Excercise 3 - Side-Effects

## Instructions

https://github.com/kfrederix/angular-signals-workshop#exercises

```
apps
│
└── 03-side-effects
    │   ...
    ├── README.md
    ...

```

<br>

## Run app

```bash
pnpm start side-effects
```


---
transition: slide-left
layout: two-cols
---

# Glitch-Free Execution

Solving the diamond problem.

```ts {*}{lines:true}
firstName = signal('Peter');
lastName = signal('Parker');

fullName = computed(() => 
  `${this.firstName()} ${this.lastName()}`
);

changeName() {
  this.firstName.set('Spider');
  this.lastName.set('Man');
}

constructor() {
  effect(() => {
    log(`Full name is: ${this.fullName()}`);
    // 1. LOG: Full name is: Peter Parker
    // changeName()
    // 2. LOG: Full name is: Spider Man
  });
}
```

::right::

<div class="h-80 mt-20 ">
  <img class="block h-full mx-auto" src="./images/diamond_problem.png">
</div>


---
transition: slide-left
---

# Equality Check

Signals don't trigger any reactions (template/computed/effect) when updated with an _equal_ value.


````md magic-move {lines:true}
```ts {*}
count = signal(0);

effect(() => console.log(`Count: ${count()}`));
// LOG Count: 0

// ... time passes
count.set(1);
// LOG Count: 1

// ... time passes
count.set(1);
// (no log)

// ... time passes
count.set(2);
// LOG Count: 2
```
```ts {*}
// By default, signals use referential equality (=== comparison)
thing = signal({ message: 'hello' });

effect(() => console.log(`Message: ${thing().message}`));
// LOG Message: hello

// ... time passes
thing.set({ message: 'hi there' });
// LOG Count: hi there

// ... time passes
thing.set({ message: 'hi there' });
// LOG Count: hi there

// ... time passes
thing.set({ message: 'hi there' });
// LOG Count: hi there
```
```ts {*}
// import { deepEqual } from '...';
thing = signal({ message: 'hello' }, { equal: deepEqual });

effect(() => console.log(`Message: ${thing().message}`));
// LOG Message: hello

// ... time passes
thing.set({ message: 'hi there' });
// LOG Count: hi there

// ... time passes
thing.set({ message: 'hi there' });
// (no log)

// ... time passes
thing.set({ message: 'hi there' });
// (no log)
```
````


---
transition: slide-left
---

# Signal Inputs

OUT with the decorators, IN with the signals.


```ts {*}{lines:true}
import { input } from '@angular/core';

export class ModernComponent {
  // optional
  firstName = input<string>();         // InputSignal<string | undefined>
  age = input(0);                      // InputSignal<number>

  // required
  lastName = input.required<string>(); // InputSignal<string>

  // extra options: transform / alias
  // USAGE: <modern-component disabled />
  isDisabled = input(false, { transform: booleanAttribute, alias: 'disabled' });
}
```


---
transition: slide-left
---

# Outputs

- _Not_ a Signal
- Direct replacement for traditional `@Output()` decorator
- Improved type-safety

<br>


````md magic-move {lines:true}
```ts
import { output } from '@angular/core';

export class ListComponent {
  itemSelected = output<number>(); // OutputEmitterRef<number>
}

/*
class OutputEmitterRef<T> implements OutputRef<T> {
  subscribe(callback: (value: T) => void): OutputRefSubscription;
  emit(value: T): void;
}
*/
```
```ts
import { outputFromObservable } from '@angular/core/rxjs-interop';

export class ListComponent {
  nameFormControl = new FormControl('', [Validators.required]);

  // OutputEmitterRef<boolean>
  validChange = outputFromObservable(
    this.nameFormControl.statusChanges.pipe(
      map((status) => status === 'VALID'),
    ),
  );
}
```
````


---
transition: slide-left
---

# Model inputs

Two-way binding with signals. Yes, input + output at the same time!


````md magic-move {lines:true}
```ts
@Component({
  selector: 'custom-checkbox',
  template: '<div (click)="toggle()"> ... </div>',
})
export class CustomCheckbox {
  checked = model(false); // ModelSignal<boolean> - Writable!

  toggle() {
    // While standard inputs are read-only, you can write directly to model inputs.
    this.checked.update((isChecked) => !isChecked);
  }
}
```
```ts {10-17}
export class CustomCheckbox {
  checked = model(false); // ModelSignal<boolean> - Writable!

  toggle() {
    // While standard inputs are read-only, you can write directly to model inputs.
    this.checked.update((isChecked) => !isChecked);
  }
}

@Component({
  imports: [CustomCheckbox],
  template: `<custom-checkbox [(checked)]="isChecked"></custom-checkbox>`,
})
export class App {
  // will be updated with new value when toggled from CustomCheckbox
  protected isChecked = signal(false);
}
```
```ts {2-3,11-19}
export class CustomCheckbox {
  // This automatically creates an output named "checkedChange".
  checked = model(false);

  toggle() {
    // While standard inputs are read-only, you can write directly to model inputs.
    this.checked.update((isChecked) => !isChecked);
  }
}

@Component({
  imports: [CustomCheckbox],
  template: `<custom-checkbox (checkedChange)="onCheckedChange($event)"></custom-checkbox>`,
})
export class App {
  onCheckedChange(checked) {
    log(`the checkbox is now ${checked ? 'checked' : 'unchecked'}`);
  }
}
```
````


---
transition: slide-left
---

# Signal-based Queries

 - easier to understand and use
 - signal-based
 - easy to integrate with other signals

<br>

````md magic-move {lines:true}
```ts {*}
import { viewChild } from '@angular/core';

@Component({
  template: `<div #myEl></div>`,
})
export class MyComponent {
  myEl = viewChild<ElementRef>('myEl'); // Signal<ElementRef | undefined>
}
```
```ts {7-12}
import { viewChild } from '@angular/core';

@Component({
  template: `<div #myEl></div>`,
})
export class MyComponent implements AfterViewInit {
  nonExistingEl = viewChild<ElementRef>('nonExistingEl'); // Signal<ElementRef | undefined>

  ngAfterViewInit() {
    // Will be undefined in case of no match:
    log(`nonExistingEl: `, this.nonExistingEl()?.nativeElement);
  }
}
```
```ts {7-13}
import { viewChild } from '@angular/core';

@Component({
  template: `<div #myEl></div>`,
})
export class MyComponent implements AfterViewInit {
  nonExistingEl = viewChild.required<ElementRef>('nonExistingEl'); // Signal<ElementRef>

  ngAfterViewInit() {
    // Error will be thrown in case of no match:
    // NG0951: Child query result is required but no value is available.
    log(`nonExistingEl: `, this.nonExistingEl().nativeElement);
  }
}
```
````


---
transition: slide-left
---

# Signal-based Queries

1. View Queries - <span class="text-sm opacity-50">Query elements from component's template.</span>


```ts {*}{lines:true}
// OLD
@ViewChild(MatPaginator) paginatorComponent!: MatPaginator; // Note the exclamation mark ('!')
@ViewChildren(BookComponent) books: QueryList<BookComponent>;

// NEW
paginatorComponent = viewChild.required(MatPaginator); // Signal<MatPaginator>
books = viewChildren(BookComponent);                   // Signal<readonly BookComponent[]>

```

<br>

<v-click>

2. Content Queries - <span class="text-sm opacity-50">Query elements projected into component via `<ng-content>`.</span>

```ts {*}{lines:true}
// OLD
@ContentChild(TitleComponent) title!: ElementRef; // Note the exclamation mark ('!')
@ContentChildren(TitleComponent) titles: QueryList<TitleComponent>;

// NEW
title = contentChild.required(TitleComponent); // Signal<TitleComponent>
titles = contentChildren(TitleComponent);      // Signal<readonly TitleComponent[]>
```

</v-click>

<style>
  .slidev-layout h1 + p {
    opacity: 1;
  }
</style>


---
transition: slide-left
---

# Excercise 4 - Inputs & Queries

## Instructions

https://github.com/kfrederix/angular-signals-workshop#exercises

```
apps
│
└── 04-inputs-and-queries
    │   ...
    ├── README.md
    ...

```

<br>

## Run app

```bash
pnpm start inputs-and-queries
```



---
transition: fade-out
---

# RxJS Interop

Mixing Signals and Observables... is fine!

#### 1. Observable to Signal


````md magic-move {lines:true}
```ts {1,9-13}
import { toSignal } from '@angular/core/rxjs-interop';

export class MyComponent {
  nameFormControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  // Signal<boolean>
  isNameValid = toSignal(
    this.nameFormControl.statusChanges.pipe(map((status) => status === 'VALID')),
    { initialValue: false }, // 👈 eliminates undefined from the type
  );

  // Easily consume it in computed() - Reactive!
  isSaveButtonEnabled = computed(() => this.isNameValid() && this.isFormDirty() && ...);
}
```
```ts {9-13}
import { toSignal } from '@angular/core/rxjs-interop';

export class MyComponent {
  nameFormControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  // Signal<boolean>
  isNameValid = toSignal(
    status$(this.nameFormControl).pipe(map((status) => status === 'VALID')),
    { requireSync: true }, // 👈 when you are sure the observable can emit immediately
  );

  // Easily consume it in computed() - Reactive!
  isSaveButtonEnabled = computed(() => this.isNameValid() && this.isFormDirty() && ...);
}
```
```ts {*}
import { toSignal } from '@angular/core/rxjs-interop';

export class MyComponent {
  nameFormControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  // Signal<boolean>
  isNameValid = toSignal(
    status$(this.nameFormControl).pipe(map((status) => status === 'VALID')),
    { requireSync: true }, // 👈 when you are sure the observable can emit immediately
  );

  // Easily consume it in computed() - Reactive!
  isSaveButtonEnabled = computed(() => this.isNameValid() && this.isFormDirty() && ...);
}
```
````


---
transition: fade-out
---

# RxJS Interop

Mixing Signals and Observables... is fine!

## Pitfalls when using `toSignal()`

2 things to be aware of:

1. Subscribes immediately <span class="text-sm opacity-75"> - in contrast to e.g. `async` pipe in the template</span>
2. Subscription remains until destroy <span class="text-sm opacity-75"> - avoid `toSignal()` in shared services</span>


<p class="italic">👉 This is by design. Sometimes it's what we want. But we must be aware 🧠.</p>



---
transition: fade-out
---

# RxJS Interop

Mixing Signals and Observables... is fine!

#### 2. Signal to Observable

```ts {*}{lines:true}
import { toObservable } from '@angular/core/rxjs-interop';

export class MyComponent {
  value = input.required<string>(); // InputSignal<string>
  value$ = toObservable(this.value);

  ngOnInit() {
    // 👇 Reacts to changes in the Signal
    combineLatest([value$, otherObservable$])
     .pipe(
       // ...
       takeUntilDestroyed(this.destroyRef),
     )
     .subscribe(() => {
       // ...
     });
  }
}
```

---
transition: slide-left
---

# RxJS Interop

Mixing Signals and Observables... is fine!

#### 3. Reading a Signal from RxJS operators (non-reactive)

```ts {*}{lines:true}
export class MyComponent {
  value = input.required<string>(); // InputSignal<string>
  
  save() {
    this.facade.save().pipe(
      // 👇 Read signal value, but DON'T react to it
      tap(() => log(`saved: ${this.value()}`)),
    );
  }
}
```


---
transition: slide-left
---

# What About Asynchronous Data?

How can we use Signals for asynchronously loaded data? 🤔

Let's take this common use case as an example:

````md magic-move {lines:true}
```ts
export class MovieComponent {
  id = input.required<number>();

  // How can we load movie data asynchronously (http), based on id ???
  movie = /* ... */
}
```
```ts
export class MovieComponent {
  id = input.required<number>();

  // How can we load movie data asynchronously (http), based on id ???
  movie = signal<Movie | undefined>(undefined);

  // SOLUTION 1 - effect()
  constructor() {
    effect(
      () => this.movieFacade.movieById$(this.id()) // 👈 reacts to id signal
        .subscribe((movieData) => {
          this.movie.set(movieData); // 👈 update the signal
        }),
      // 👇 NG0600: Writing to signals is not allowed in a `computed` or an `effect` by default
      { allowSignalWrites: true },
    );
  }
}
```
```ts
export class MovieComponent {
  id = input.required<number>();

  // How can we load movie data asynchronously (http), based on id ???
  movie = signal<Movie | undefined>(undefined);

  // SOLUTION 1 - effect()
  constructor() {
    effect(() => {
      this.movieFacade.movieById$(this.id())
        .subscribe((movieData) => {
          // slightly better, but still imperative 😢
          untracked(() => this.movie.set(movieData));
        });
    });
  }
}
```
```ts
export class MovieComponent {
  id = input.required<number>();

  // How can we load movie data asynchronously (http), based on id ???
  // SOLUTION 2 - toObservable > switchMap > toSignal
  movie = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this.movieFacade.movieById$(this.id$))
    ),
  ); // Type: Signal<number | undefined>

  // 😀 declarative!
  // 🤔 back-and-forth conversion between signal and observable feels weird
}
```
```ts
import { derivedAsync } from 'ngxtension/derived-async';

export class MovieComponent {
  id = input.required<number>();

  // How can we load movie data asynchronously (http), based on id ???
  // SOLUTION 3 - ngxtension/derived-async 😎
  movie = derivedAsync(() => {
    const movieId = this.id(); // 👈 reacts to id signal
    return this.movieFacade.movieById$(movieId); // 👈 Observable or Promise, both are supported
  ); // Type: Signal<number | undefined>

  // 😀 declarative!
  // 😎 code looks clean!
}
```
````



---
transition: slide-left
---

# Sources

Big thanks for all these amazing articles, docs and utils ❤️

- https://angular.dev
- https://blog.angular-university.io/angular-signals/
- https://blog.angular-university.io/angular-viewchild-contentchild/
- https://dev.to/this-is-angular/angular-signals-everything-you-need-to-know-2b7g
- https://dev.to/modderme123/super-charging-fine-grained-reactive-performance-47ph
- https://medium.com/@eugeniyoz/angular-signals-best-practices-9ac837ab1cec
- https://medium.com/ngconf/local-change-detection-in-angular-410d82b38664
- https://github.com/ngxtension/ngxtension-platform

