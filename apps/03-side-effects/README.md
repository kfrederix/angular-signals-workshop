# Side Effects

**BUG:** Weird Logs!? 🤔

## Run app

```bash
pnpm start side-effects
```

## Instructions

Even though this app seems to work fine on the surface, there is a bug in it. To see it, open up the JS console and analyze the logged messages. There is clearly something wrong there 🤔

The team wants to get this bug fixed, but **_first_** they want you to refactor it to signals:

1. Refactor this app to signal-land (we still like RxJS in general, but let's remove it from this app)
2. Re-evaluate the logging behavior after refactoring to signals
3. Fix the bug
