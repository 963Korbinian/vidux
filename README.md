# VIDUX

**A free shop ledger for Sri Lanka.** Credit book, cash book, stock book and
bills — in Sinhala, Tamil and English. Works without internet.

Open it: **https://963korbinian.github.io/vidux/**

Made by [HUBIX Logistics (Pvt) Ltd](https://hubixlogistics.app), Galle.

---

## What it does

| Book | |
|---|---|
| **Credit** (ණය / கடன்) | What each customer owes, with a polite WhatsApp reminder |
| **Cash** | Money in and out, by day, week or calendar month |
| **Stock** | What is on the shelf, what is running out, what sells |
| **Bills** | Build a bill, send it on WhatsApp, cash or on credit or LankaQR |

One bill moves all three books at once. A cash sale lands in the cash book,
a credit sale lands on the customer's page, and the shelf goes down — in one step.

**For shops with no shelf** — barbers, tailors, tuition classes, three-wheel
drivers — there is a service mode: no stock tab, just fixed prices you tap once.

## What makes it different

- **Free, with no limits.** No cap on entries, no locked buttons, nothing to buy.
- **It really works offline.** The whole app is cached, fonts included. Open it
  in a power cut, on a dead network, anywhere.
- **Several phone numbers on one book**, with four roles — owner, family,
  counter, accountant — and a record of who wrote what.
- **Nothing is overwritten.** A correction is written as its own opposite line,
  so the history stays honest and an accountant will accept the export.
- **Your book stays on your phone.** No account needed, no server holds it.
  Keep a copy as a file whenever you like.

## Running it yourself

It is one static folder. Any web server will do:

```bash
python3 -m http.server 8000 --directory .
```

Then open `http://localhost:8000`. For the install prompt and offline mode you
need HTTPS (or localhost) — that is a browser rule, not ours.

## Source

The app is a single `index.html` — plain JavaScript, no framework, no build
step. It is meant to stay readable and to load fast on a cheap Android phone.

`sw.js` caches the shell. `manifest.webmanifest` makes it installable.
Fonts are in `fonts/` so nothing is fetched from Google at runtime.

## Licence

**Code: © HUBIX Logistics (Pvt) Ltd. All rights reserved.** Published so it can
be read and so the app can be served — not released for reuse. Ask us.

**Fonts** are not ours and keep their own licence: Inter, JetBrains Mono and
Noto Sans Sinhala/Tamil are all under the SIL Open Font License 1.1 — see
`fonts/LICENSE.md`.
