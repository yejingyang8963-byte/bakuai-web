# Reddit launch posts

> ⚠️ Read this before posting!
>
> Reddit is **the most effective** organic channel for indie iOS apps in 2026, but also the **most aggressive at banning self-promotion**.
>
> Rules of survival:
> 1. **Account age + karma matter.** Brand-new account = shadowban. Use an account with 3+ months age and ≥100 comment karma.
> 2. **Post only to subs that allow self-promotion.** Each sub below is verified as allowing it (as of 2025), but check the sidebar rules at posting time.
> 3. **Don't crosspost the same text** to multiple subs in 24 hours. Reddit's spam filter will nuke all of them.
> 4. **Engage in comments.** A "drop link and run" post gets reported. Stay 2 hours after posting and reply to every comment.
> 5. **Disclose you're the maker.** Subs hate astroturfing. "I made this" up front is fine.

---

## Sub 1: r/SideProject

> Audience: indie devs, fellow makers, supportive
> Self-promo: encouraged
> Best time: weekday morning EST/PT

**Title:**
```
[I made this] Baku AI — a bedtime story app that runs Google Gemma 4 entirely on the iPhone (no cloud, $5.99 one-time)
```

**Body:**
```
Hey r/SideProject! 👋

After ~6 months solo, I just shipped my first iOS app. Bedtime story app for kids 3–8 that runs Gemma 4 entirely on-device via MLX-Swift.

**Why I built it:** I subscribed to Calm Kids for a year, then read the privacy policy and didn't love that my daughter's voice could be sent to a cloud server. I wanted an app that simply doesn't have a server.

**The technical interesting bits:**
- 4-bit Gemma 4 (E2B), ~1.5 GB, loaded into iPhone RAM
- MLX-Swift instead of llama.cpp — better Metal perf, pure Swift, no bridging headers
- Streaming TTS — sentence-by-sentence punctuation chunking. Time-to-first-audio ~2.5 sec.
- 12-language safety filter, no open chat input for kids (curated wishes only)
- App Store Kids category compliant (the parental gate + AI consent dance is its own saga)

**Pricing:** $5.99 one-time, no subscription. (I have an optional $0.99/mo tier for "Personal Voice" — your own recorded voice reads stories — but the core app needs nothing recurring.)

**Tech write-up:** https://bakuai.app/blog/building-baku-ai-on-device-gemma-4

**App Store:** https://apps.apple.com/app/id6762072650

Happy to answer anything about MLX-Swift, on-device thermal management, or App Store Kids category review (which is its own special hell).
```

---

## Sub 2: r/iosapps

> Audience: iOS app users + devs who care about quality
> Self-promo: allowed once per app, must be tagged [Self-promo] or [Maker]

**Title:**
```
[Maker] Bedtime story app for kids that runs entirely offline — no subscription, no cloud, $5.99 once
```

**Body:**
```
Hi r/iosapps,

Indie dev, just shipped Baku AI. iPhone bedtime stories for kids 3–8.

The reason it's worth a look: it runs Google's Gemma 4 LLM entirely on your iPhone. After a 1.5 GB first-time download, the app uses zero network. You can verify it: airplane mode + generate a story works.

**Why this matters for kids' apps specifically:**
- Most "AI for kids" apps stream voice + prompts to a cloud LLM. Voice recordings of children get logged.
- Baku doesn't do that, by architecture. There is no server.
- COPPA + GDPR-K compliant — but more importantly, "compliant by code" not "compliant by EULA."

**What you get:**
- A different bedtime story every night (AI-generated)
- 264 preset stories + 10 lullabies × 3 languages + 10 meditations + 7 ambient sounds (all built in)
- English / Simplified Chinese / Spanish read by Apple's natural voices
- Sleep timer with screen-dim
- Optional child profile (name, age, theme) for personalization — stored locally

**What it costs:**
- $5.99 one-time, lifetime access. No subscription.
- Optional $0.99/month for Personal Voice (record your own voice once, the app reads in your voice forever).

**Limits:**
- iPhone 13 Pro / 14 / newer (the on-device model needs ≥ 6 GB RAM)
- iOS 17+
- Android isn't on the roadmap yet
- 1.5 GB initial download (one-time, then offline forever)

App Store: https://apps.apple.com/app/id6762072650
Website: https://bakuai.app

Happy to answer questions, including about the technical trade-offs of on-device AI (it's not all upside — there are real downsides, like model size and thermal management).
```

---

## Sub 3: r/parenting (with caution)

> Audience: parents
> Self-promo: USUALLY NOT ALLOWED unless framed as a discussion post
> Strategy: do NOT post this as "look at my app." Post it as a question / thoughtful piece.

**Title:**
```
What do you actually look for in a kids' bedtime app? (And: am I crazy for caring about cloud privacy at bedtime?)
```

**Body:**
```
Parents of r/parenting,

Bedtime ritual question for the hive mind:

I have a 3-year-old who's been into Calm Kids for about a year. Loved the meditations, but two things have been nagging me:

1. The annual subscription cost. $69.99/year, auto-renew. Fine if she'll use it for years, but a lot for "background bedtime audio."
2. Reading the privacy policy made me realize voice recordings of her could be processed by their analytics partners.

Is anyone else weighing this trade-off? What's the calculus you use?

I tried a bunch of alternatives (Smiling Mind, Storyberries, Snoozly, just plain podcasts) and ended up... building my own app, because none did exactly what I wanted (AI-generated personalized stories + 100% offline). It just shipped to the App Store, mostly for my own use case.

But honestly, I'd love feedback on:

- Do other parents actually care about the cloud/privacy thing for kids' apps, or is it a "tech parent" niche concern?
- Is "different story every night" appealing, or do kids do better with the same beloved story re-read 100 times? My kid likes both, but I've heard younger kids prefer repetition.
- What's the actual right price point for a kids' app? Subscription fatigue is real but I want to be fair to developers.

If anyone wants to try the app I built, link in the comments — but I'd genuinely just love the discussion regardless.
```

> Then in a comment, drop the link:
> ```
> For anyone curious — I made it $5.99 one-time, link is https://bakuai.app. iPhone only, ages 3-8.
> ```

---

## Sub 4: r/MachineLearning (only if you can ELI5 the technical bits)

> Audience: ML researchers + engineers
> Self-promo: discouraged unless paper/code/technical writeup is the focus
> Strategy: Lead with the tech, app is secondary

**Title:**
```
[P] Shipping Gemma 4 on-device in a consumer iOS app — what worked, what didn't (1 indie dev, ~6 months)
```

**Body:**
```
Project: Baku AI — bedtime story generator for kids on iPhone.

Wrote up the technical journey of shipping a real on-device LLM in production. Numbers from real devices:

| Device | Cold load | Tokens/sec | RAM peak |
|---|---|---|---|
| iPhone 13 Pro | 4.8s | 22 t/s | 1.7 GB |
| iPhone 14 | 3.2s | 28 t/s | 1.6 GB |
| iPhone 14 Pro | 2.4s | 32 t/s | 1.6 GB |
| iPhone 15 Pro | 1.9s | 38 t/s | 1.6 GB |
| iPhone 16 Pro | 1.6s | 42 t/s | 1.5 GB |

Some specific things that surprised me:

1. **MLX-Swift > llama.cpp** for this use case. ~30% better Metal kernel performance vs llama.cpp's Metal backend. Plus pure Swift, no bridging headers.

2. **Streaming TTS via punctuation chunking** is the perceived-latency unlock. Time-to-first-audio is 1.5–2.5s by piping each completed sentence to AVSpeechSynthesizer while the model continues generating.

3. **Thermal throttling is the real ceiling**, not RAM. After ~3 stories back-to-back, sustained tokens/sec drops 40%. Falling back gracefully (pre-recorded story library) is mandatory UX.

4. **Children's content has a higher safety bar** than adult chat. We layer 3 defenses: prompt sanitization, negative prompt in system message, regex output filter (12 langs).

Full write-up: https://bakuai.app/blog/building-baku-ai-on-device-gemma-4

App Store (if you want to actually try it): https://apps.apple.com/app/id6762072650 — $5.99, kids 3-8.

Happy to answer ML / iOS engineering questions in comments. Particularly interested in how others are handling the "user input → prompt" sanitization layer for kid-facing products.
```

---

## Posting cadence

Don't post all 4 in one day. Stagger:

- **Day 1 (Mon-Wed):** r/SideProject (warmest reception)
- **Day 3:** r/iosapps
- **Day 7:** r/MachineLearning (if you have the technical depth to defend it in comments)
- **Day 10+:** r/parenting (the most subjective; needs you genuinely engaged in the discussion)

This spacing prevents Reddit's spam filter from flagging cross-promotion.
