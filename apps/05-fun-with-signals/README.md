# Fun with Signals

You thought Pokémon was just for kids? Well, maybe you're right. But why not have some fun with them, while we implement a cool search app for Pokémon 🔴⚪ cards? 😄

## Run app

```bash
pnpm start fun-with-signals
```

## Instructions

1. Have a look at the code first. Then type something in the search box and notice how the URL query param is automatically updated. Refresh the page, and notice how the search box automatically reflects the query param value. Can you understand why this works?
2. Now implement the missing parts, to show the pokemon card search results in a grid.
3. Each card should show a tooltip (`title` attribute) with the pokemon name, subtypes, HP and name of the set. Example: `Gengar V - Basic/V/Single Strike - HP: 210 - Fusion Strike`
4. **Bonus**: show a loading indicator while search is in progress

An example of how it could look, after successful implementation:

![Pokémon search app example](./pokemon_search_app.gif)
