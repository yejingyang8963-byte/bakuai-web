---
layout: ../../layouts/BlogPostLayout.astro
title: "We Built a Bedtime Story App That Runs Google Gemma 4 Entirely On-Device"
description: "Technical write-up: how Baku AI generates personalized bedtime stories using a 4-bit quantized Gemma 4 model, MLX-Swift, and zero servers. Cold-start, memory, and battery numbers from real iPhones."
pubDate: "2026-04-25"
updatedDate: "2026-04-25"
author: "Jingyang Ye"
image: "/illustrations/10-stack-books.webp"
tags: ["on-device AI", "mlx-swift", "gemma 4", "ios development", "indie"]
---

This is a technical write-up for engineers who are wondering whether you can ship a real on-device LLM in a consumer app in 2026. Short answer: **yes, but the constraints are tighter than the demos suggest.** Here's what worked, what didn't, and the actual numbers.

---

## What we shipped

[Baku AI](https://bakuai.app) is a kids' bedtime story app on iOS. It runs Google's **Gemma 4** (4-bit quantized, ~1.5 GB) entirely on the iPhone via [MLX-Swift](https://github.com/ml-explore/mlx-swift). One developer, no team, ~6 months from architecture to App Store launch.

The core flow:
1. User picks a "wish" (e.g., "a friendly dragon").
2. We construct a prompt and stream tokens from the on-device model.
3. We chunk the stream by punctuation and send each sentence to `AVSpeechSynthesizer`.
4. The synthesizer reads aloud while the model continues generating.

Result: **time-to-first-audio under 3 seconds** on iPhone 14 Pro. The rest streams in real time.

---

## The hard constraints

### Memory

The 4-bit Gemma 4 (E2B) model occupies **~1.5 GB of RAM** when loaded. iOS aggressively kills apps that exceed their memory entitlement.

Mitigations:
- Add the **`com.apple.developer.kernel.increased-memory-limit`** entitlement (granted on request to indie devs, no special tier needed).
- Target iPhone 13 Pro / 14 / 14 Pro / 15 / 16 / 17 — anything with ≥ 6 GB RAM.
- On iPhone 13 (non-Pro) and earlier, fall back to a smaller pre-recorded story library. Don't try to squeeze the model in.

### Thermal throttling

Generating 5 minutes of story keeps the Apple Neural Engine warm. After ~3 stories back-to-back, you'll hit thermal throttling and tokens-per-second drops by 40 %.

Mitigations:
- Detect `ProcessInfo.thermalState`. At `.serious` or `.critical`, gracefully play a pre-recorded fallback story ("I got a little tired thinking, let's hear one I prepared earlier...").
- Never crash on thermal — kids and parents will not understand the technical reason and will rage-uninstall.

### Cold start

Loading 1.5 GB into RAM from disk takes **2–5 seconds** on first launch and **1–2 seconds** on subsequent launches. We download the model once on first install (showing a moon-phase progress UI for ~3 minutes on Wi-Fi).

We tried:
- Lazy-loading model only when user taps "Start AI Story" — felt slow.
- Pre-loading on app launch — drained battery and warmed the phone.

Final approach: **background download** on first launch + **lazy memory load** on first AI tap, with a 264-story pre-rendered library available immediately for the first session.

---

## Why MLX-Swift, not llama.cpp / Core ML?

Three reasons:

1. **MLX-Swift is Apple's native ML primitive.** Same compute graph as PyTorch, but uses Apple Silicon's unified memory directly. No CPU↔GPU copy overhead.
2. **No bridging headers, no Python.** It's pure Swift. The pain of debugging C++ stack traces in Xcode is real and we avoided all of it.
3. **The mlx-lm package** ([github.com/ml-explore/mlx-swift-lm](https://github.com/ml-explore/mlx-swift-lm)) ships pre-tested Gemma 4 model code. Drop-in.

We tried `llama.cpp` for the first prototype. It worked but the Metal kernel performance was 30 % worse than MLX on the same hardware, and we didn't trust ourselves to maintain the bridging code long-term.

---

## Streaming TTS architecture

The trick to perceived performance: **never wait for the full story.** Even at 30 tokens/sec, generating a 600-token story takes 20 seconds — too long.

Instead:

```swift
class TokenStreamBuffer {
    private var buffer = ""
    private let punctuation: Set<Character> = [".", "?", "!", "。", "？", "！", ",", "，"]

    func append(_ token: String) -> [String]? {
        buffer += token
        guard let lastPunct = buffer.lastIndex(where: { punctuation.contains($0) }) else {
            return nil
        }
        let sentence = String(buffer[..<buffer.index(after: lastPunct)])
        buffer.removeSubrange(..<buffer.index(after: lastPunct))
        return [sentence]
    }
}
```

Each completed sentence ships immediately to `AVSpeechSynthesizer`. The model and TTS run in parallel. Time-to-first-audio is whatever it takes to reach the first comma — usually 1.5–2.5 seconds.

For Chinese, the punctuation set includes `。？！，`. For Spanish, the inverted `¿¡` aren't terminators. Test in all your shipped languages.

---

## Safety: 12-language keyword filter

The model is gentle (4-bit Gemma 4 trained for instruction-following), but children's content has a higher safety bar than adults. We layer three defenses:

1. **Prompt sanitization** — Unicode normalization + strip injection markers before passing user input as a "wish."
2. **Negative prompt in system message** — explicit list of avoided themes (violence, fear, separation anxiety) in the system prompt for all 3 supported languages.
3. **Output keyword filter** — 12-language regex pass on each generated sentence. Words boundaries enforced (`\b`) to prevent obvious bypasses. Match → swap with a soft synonym or end the story politely.

We deliberately do not allow free-form text input from the child. The "wish" is always selected from a curated list. A 4-year-old shouldn't be allowed to write `"I want a story about [thing the parent did not foresee]"`.

---

## Numbers from real devices

| Device | Cold load | Tokens/sec | RAM peak | Battery / 5-min story |
|---|---|---|---|---|
| iPhone 13 Pro | 4.8 s | 22 tok/s | 1.7 GB | ~3 % |
| iPhone 14 | 3.2 s | 28 tok/s | 1.6 GB | ~2.5 % |
| iPhone 14 Pro | 2.4 s | 32 tok/s | 1.6 GB | ~2 % |
| iPhone 15 Pro | 1.9 s | 38 tok/s | 1.6 GB | ~1.8 % |
| iPhone 16 Pro | 1.6 s | 42 tok/s | 1.5 GB | ~1.5 % |

A typical bedtime session is 1–2 stories. Battery cost is negligible compared to a YouTube Kids session.

---

## What I'd do differently

If I were starting over:

1. **Ship a smaller model first.** Gemma 4 E2B is great but ~1.5 GB excludes a lot of devices. A 270M-param fine-tune could ship on every iPhone for the first version, then upsell the larger model.
2. **Don't promise multilingual on day one.** We launched in English / Simplified Chinese / Spanish to "be ready for international." Truth: 95 % of users are in one language. Expand after.
3. **Better thermal UX.** Currently we silently fall back to pre-recorded on thermal throttle. A 1-line indication ("Baku is a little warm, here's a pre-made story") would help.
4. **Open source the prompt filter.** It's the most defensible piece and would build trust if it were public.

---

## Should you build on-device AI?

If your product:

- Generates content from user input (text, voice, image)
- Doesn't *need* a server for the core feature
- Has a privacy story you can credibly tell

…then on-device is not just possible in 2026, it's a meaningful differentiator. Apple Silicon is fast enough. The tooling (MLX, Core ML, MLX-Swift) is good enough. The constraints (RAM, thermal, cold start) are manageable.

The main thing it costs you is "real-time model improvement" — you can't A/B test prompts against your user base, because you're not collecting data. That's the trade.

For a kids' bedtime app, that trade was easy.

---

## Repos and references

- MLX-Swift: [github.com/ml-explore/mlx-swift](https://github.com/ml-explore/mlx-swift)
- MLX-Swift-LM: [github.com/ml-explore/mlx-swift-lm](https://github.com/ml-explore/mlx-swift-lm)
- Gemma 4 paper: [storage.googleapis.com/deepmind-media/gemma/Gemma3Report.pdf](https://storage.googleapis.com/deepmind-media/gemma/Gemma3Report.pdf)
- Baku AI on App Store: [apps.apple.com/app/id6762072650](https://apps.apple.com/app/id6762072650)
- Baku AI website: [bakuai.app](https://bakuai.app)

If you're building something similar and want to compare notes, [reach out](mailto:Metaphoria1688@gmail.com).

— *Jingyang Ye*
