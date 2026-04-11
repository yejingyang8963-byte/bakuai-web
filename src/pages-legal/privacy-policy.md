# Baku AI — Privacy Policy

**Effective date:** 2026-04-11
**Last updated:** 2026-04-11

Baku AI ("we," "us," "the app") is an offline bedtime-story companion
designed for children ages 3–7 and their parents. This policy explains
exactly what data the app handles and — more importantly — what it
never touches.

---

## 1. The short version

**Baku AI collects zero personal data.** No accounts, no tracking, no
analytics, no advertising, no cloud servers processing your child's
voice or stories. The app runs 100% on your device after the initial
AI model download. We physically cannot see, store, or share anything
you or your child say or do inside the app, because there is no
backend to receive it.

If you read nothing else, read that paragraph.

---

## 2. What we do **not** collect

We do not collect, transmit, or store any of the following:

- Your name, email address, phone number, or any identifier
- Your child's name, age, voice recording, or story content
- Location data (GPS, IP-based, or otherwise)
- Device identifiers used for tracking (IDFA, IDFV)
- Usage analytics, crash reports, or telemetry
- Advertising identifiers
- Contact lists, photos, calendars, or any other data from your device
- Any data subject to COPPA, GDPR-K, or similar child-privacy regulations

There is no "account" to create. There is no "sign in." There is
nothing to opt out of, because there is nothing to opt into.

---

## 3. What stays on your device

The following data is created and stored **only on your device**.
None of it is transmitted anywhere:

| Data | Where it lives | Why it exists |
|---|---|---|
| Your child's voice captured by the microphone | iOS speech recognition (on-device mode) | Converted to text for AI story generation; discarded immediately after |
| Story prompts typed or spoken | In-memory only | Sent to the on-device AI model to generate a story |
| Generated story text | RAM during playback | Never written to disk by default |
| Listening history (titles only) | iOS UserDefaults, local to your device | Powers the "Today's story" suggestion |
| Sleep duration statistics | iOS UserDefaults | Powers the optional sleep statistics view |
| Settings (language, voice, paywall state) | iOS UserDefaults | Remembers your preferences between launches |

All of this is inside the app's sandbox. When you delete Baku AI, all
of this is deleted with it. There is no copy elsewhere.

---

## 4. Microphone and speech recognition

When you tap "I want to tell my own," Baku AI activates the iPhone
microphone and Apple's `SFSpeechRecognizer` to transcribe your voice
to text. We have configured this recognizer with
`requiresOnDeviceRecognition = true`, which means:

- Your voice is processed **entirely on your device**
- Audio samples are **never sent to Apple's cloud**
- Audio samples are **never sent to our servers** (we don't have any)
- The raw audio is discarded as soon as transcription completes

iOS may ask your permission the first time you use this feature. If
you deny permission, you can still use every other part of the app —
preset stories, lullabies, meditation, and ambient sounds all work
without the microphone.

---

## 5. Initial AI model download

When you first install Baku AI, the app downloads a ~1.5 GB on-device
AI language model (Google Gemma 4) from Hugging Face's public CDN
(`huggingface.co`). This download happens **only once**. The model
then runs entirely offline on your device.

During this one-time download:

- Your IP address is visible to Hugging Face and your network provider,
  as with any web download
- We (the Baku AI team) do not receive any information about the
  download — it goes directly from Hugging Face to your device
- After the download completes, the app never contacts Hugging Face again

You can also use the app immediately with preset stories, lullabies,
and ambient sounds while the model downloads in the background.

---

## 6. Third-party services

Baku AI does **not** integrate any third-party SDKs, trackers, or
services for user data. Specifically, there is no:

- Firebase, Mixpanel, Segment, or other analytics SDK
- Facebook, Google, Apple Search Ads, or other advertising SDK
- Crashlytics, Sentry, or other crash reporting SDK
- Social sharing, user forums, or community features
- Chatbots or cloud LLM APIs

The only external resource the app ever touches is Hugging Face's
public model repository during the initial model download, as
described in Section 5.

---

## 7. In-app purchases

Baku AI offers optional paid upgrades via Apple's in-app purchase
system. When you make a purchase:

- Your payment is processed entirely by Apple
- We receive only an anonymous signal that a purchase completed
- We do not receive your name, email, credit card, or Apple ID
- All purchase records are stored in your Apple account, not with us

For Kids Category compliance (App Store Review Guideline 1.3), every
purchase button is gated behind a parental verification challenge
(a simple arithmetic question). Children cannot purchase by accident.

For refund requests, contact Apple directly:
https://reportaproblem.apple.com

---

## 8. Children's privacy (COPPA, GDPR-K)

Baku AI is explicitly designed for children and fully complies with
the U.S. Children's Online Privacy Protection Act (COPPA) and the
equivalent European and UK child-privacy rules, by the simplest
possible means: **we collect no personal information from anyone,
child or adult.**

Because we collect no data, there is no verifiable parental consent
to obtain, no data-access request to process, and no data-deletion
request to fulfill — there is no data.

If you are a parent or guardian and want to verify this for yourself,
you can:

- Turn on iOS Airplane Mode and confirm the app works (minus the
  one-time model download)
- Monitor your network traffic; you will observe Baku AI making zero
  network requests after the initial model download
- Inspect the source code — Baku AI is built on open frameworks

---

## 9. Data retention and deletion

Because no data leaves your device, data deletion is entirely under
your control:

- To delete everything at once, delete the Baku AI app from your device
- To clear listening history or sleep statistics only, go to
  Settings → Reset inside the app

We retain nothing on servers we do not own, because we do not own any.

---

## 10. Security

All app data is stored inside the iOS application sandbox, which
Apple isolates from other apps. iOS itself encrypts device storage
when a passcode is set. We rely on Apple's security architecture for
data-at-rest protection; because we do not transmit data, there is no
data-in-transit risk after the initial model download.

---

## 11. Changes to this policy

If we ever change this policy in a material way, we will:

- Bump the "Last updated" date at the top
- Describe the change in the app's release notes
- If the change affects what data is collected, require you to
  explicitly re-consent before the new behavior takes effect

We commit to never introducing tracking, analytics, or cloud data
processing as a silent update.

---

## 12. Contact

Questions about this policy:

- Email: Metaphoria1688@gmail.com

We respond to every privacy question within 7 days.
