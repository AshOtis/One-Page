# One Page

A small pause at the start of the day. One Page drops a single prompt into each new daily note: usually a reflective question, and now and then something to write.

```
## Reflection
*Reflection:* What are you avoiding right now?
```

## What it does

- **Every day, once:** the first time today's daily note is created or opened, One Page adds a prompt to the bottom of it. It never adds a second one, and it skips notes that already have one.
- **Five decks:**
  - **Reflection:** 200 questions about focus, mood, avoidance and what matters. This is the default.
  - **Short story:** 100 story premises.
  - **Poem:** 50 poem and haiku prompts.
  - **Dialogue:** 50 prompts for writing a conversation.
  - **Gratitude:** 50 gratitude prompts.
- **No repeats:** each deck is shuffled and dealt in full before any prompt comes round again. With 450 prompts in all, that's about a year of daily notes before anything repeats.
- **Writing decks stay special:** each one can turn up at most once a day.
- **Any note, any time:** run **Insert reflection prompt** from the command palette to put a prompt at your cursor.

## Settings

- **Auto-insert into daily notes:** on or off.
- **Story, poem, dialogue and gratitude chance:** how often each deck replaces the usual question.
- **Insert heading:** the heading placed above each prompt (default `## Reflection`). It's also how One Page tells that a note already has one.

Auto-insert uses the core **Daily Notes** plugin's folder and date format to find today's note, so that plugin needs to be on. Obsidian doesn't offer a public way to read those settings, so One Page reads them carefully: if they ever can't be read, auto-insert simply does nothing, and the command still works.

## Privacy

One Page makes no network requests and collects nothing. It only adds text to today's daily note. Its own settings and the shuffled decks are kept in the plugin's `data.json` in your vault.

## Building from source

There are no dependencies. Run `python3 build.py` to write `main.js` and `manifest.json` to `dist/`.

## Support

If it helps you start the day well, you can [buy me a coffee](https://buymeacoffee.com/ashotis). Found a bug or have an idea? [Open an issue](https://github.com/AshOtis/One-Page/issues). It's the best way to reach me, and every report gets read.

## License

[GNU AGPL v3 or later](LICENSE) © AshOtis
