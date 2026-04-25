# Product Hunt launch

> URL: https://www.producthunt.com/posts/new
> Best time to launch: 12:01 AM Pacific Time (start of PH day)
> Day of week: Tue/Wed/Thu = best. Avoid Mon/Fri/weekend.
> Pre-work: have 5-10 friends ready to upvote in the first 2 hours, ideally with PH accounts that have prior activity (don't all upvote from new accounts — looks like fraud).

---

## Name

```
Baku AI
```

## Tagline (60 chars max)

```
Bedtime stories that live in your iPhone, not the cloud
```

(54 chars)

## Short description (260 chars max)

```
A bedtime storyteller app for kids 3-8. Runs Google's Gemma 4 entirely on your iPhone — no internet, no account, no data collection. Tap once, hear a different fairytale every night. $5.99 lifetime, no subscription. Built by one indie dev for his daughter.
```

(258 chars)

## Description (long form, supports markdown)

```
I'm Jingyang, an indie iOS developer. I built **Baku AI** for my own daughter after a year of paying Calm Kids subscriptions felt wrong.

🌙 **What it does**

Pick a wish (dragons, princesses, spaceships...). Tap once. Baku reads in a soft natural voice for 5–8 minutes — and the story is different every night. The screen dims so kids listen with eyes closed.

🔒 **Why I built it**

Most "AI for kids" apps send your child's voice to a cloud LLM. The recordings often get logged "to improve the model." I wanted the opposite — an app where the AI runs entirely on the iPhone.

The first time you launch Baku, it downloads a ~1.5 GB Gemma 4 model. After that, you can put the phone in airplane mode forever and Baku still works. There is no server.

🎯 **What's actually different**

✓ 100% offline after install (verifiable — turn on airplane mode)
✓ Zero data collection, zero telemetry, zero tracking
✓ COPPA + GDPR-K compliant by architecture, not by policy
✓ $5.99 one-time, no subscription required
✓ English / Simplified Chinese / Spanish (all read by Apple's natural voices)
✓ Built-in: 264 preset stories, 10 lullabies × 3 languages, 10 meditation scripts, 7 ambient sounds — all included

📱 **Who it's for**

iPhone 13 Pro / 14 / newer (the on-device model needs ≥6 GB RAM). Ages 3–8. Parents who want a one-time purchase and a privacy story they can actually trust.

🛠 **The tech, briefly**

- Google Gemma 4 (4-bit quantized) via MLX-Swift
- Apple's on-device speech recognition + synthesis
- ~280 MB app + ~1.5 GB model on first launch
- ~3 sec time-to-first-audio on iPhone 14 Pro
- Detailed write-up: https://bakuai.app/blog/building-baku-ai-on-device-gemma-4

💬 **Honest disclosures**

- iPhone only (Android is on the maybe-list, depends on response)
- v1.0.4 just shipped 2 days ago — early but stable, 491 unit tests passing
- I'm a solo developer, no VC, no paid marketing
- I'll personally read every comment

Try Baku for $5.99. If after a week it's not right for your family, [email me](mailto:Metaphoria1688@gmail.com) — I'll help you pick a different bedtime app and send a refund link.
```

## First comment (post this yourself, immediately after launch)

Product Hunt rewards a strong "maker comment" in the first hour.

```
Hey Product Hunt! 👋

Maker here. A few things I'd love feedback on:

1. Does the on-device privacy story matter to you, or is it a niche concern? I'd love to hear what you actually weigh when picking a kids' app.

2. The current voice is Apple's high-quality TTS (free, on-device). I just integrated Kokoro neural TTS as an upgrade — interested if you'd pay extra for "more storyteller-like" voices, or whether Apple TTS is good enough.

3. iPad support is half-built but I held it back from v1.0 to keep scope small. Worth prioritizing? Or focus on Android first?

I'll be here all day responding to questions, real talk welcome. 🌙

— Jingyang
```

---

## Categories to select on PH

Primary: **iOS** (or "Mobile")
Secondary: **Education**, **Parenting**, **AI** (PH allows multiple)
Topics tags: bedtime, kids, parenting, on-device-ai, indie

## Hunter

If you don't have a PH hunter account with reputation, ask one of:
- **Chris Messina** (most prolific, hunts good products)
- **Kevin William David**
- **Bram Kanstein**

DM them on PH 1-2 weeks before launch with a 3-line pitch + invite to test the app. If they hunt you, your launch starts with their network.

## What to expect

- Median PH launch: top 10 product of the day if posted at 12:01 AM PT, ~50 upvotes, 200 site visits.
- Top 3 of the day: needs ~250 upvotes in first 6 hours. Requires pre-built audience.
- For a kids' app with privacy angle, realistic: top 10–20 of the day, "Apps of the Week" maybe, if the timing + comment engagement work.

## After launch

Whether you make it to top 5 or top 50, send a follow-up email or tweet thread within 7 days summarizing what you learned from PH commenters. PH community appreciates that.
