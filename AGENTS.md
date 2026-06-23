# Analytics Tracking — Mixpanel

This project uses **Mixpanel** for all product analytics. Mixpanel is the single source of truth for event tracking, user identification, and behavioral data. Do not introduce any other analytics tools, SDKs, or tracking libraries without explicit instruction from a user.

---

## Before You Add or Modify Any Tracking

⛔ **Do not write Mixpanel tracking code without reading this file first.**

Wrong assumptions about platform, identity, or consent will produce broken Mixpanel data that requires manual cleanup or data deletion requests.

### Mandatory checklist before writing any Mixpanel code

- [x] Confirm you are using the correct Mixpanel SDK for this project's platform (see Tech Stack below)
- [x] Check if this project routes data through a CDP — if yes, send Mixpanel events through the CDP, not the Mixpanel SDK directly (No, direct integration)
- [x] Check if consent/exclusion gating is required — owner/opt-out gate is active in this project via `uk_disable_tracking` localStorage key
- [x] Review the existing Mixpanel tracking plan below before adding new events

---

## Tech Stack

| Detail | Value |
|---|---|
| **Platform** | React SPA (Vite 8) |
| **Mixpanel SDK** | `mixpanel-browser` |
| **SDK version** | `^2.80.0` |
| **Tracking method** | client-side (unified wrapper) |
| **CDP (if any)** | none |
| **Consent/Exclusion required** | Owner opt-out check (`uk_disable_tracking` key in localStorage) |
| **Mixpanel project token location** | `src/analytics/mixpanel.ts` |

---

## Mixpanel Initialization

Mixpanel is initialized inside the unified analytics layer:

**File:** `[src/analytics/analytics.ts](file:///Users/utkarshkala/Documents/GitHub/utkarsh-portfolio/src/analytics/analytics.ts)`
**Mixpanel module:** `[src/analytics/mixpanel.ts](file:///Users/utkarshkala/Documents/GitHub/utkarsh-portfolio/src/analytics/mixpanel.ts)`

```typescript
// Initialise GTM dataLayer + Mixpanel SDK before React renders
initAnalytics() // Called in src/main.tsx
```

**Do not:**
- Initialize Mixpanel in multiple places
- Create separate Mixpanel instances per component or module
- Import Mixpanel directly in feature files — use the shared `trackEvent` helper in `src/analytics/analytics.ts`

---

## Mixpanel Identity

Mixpanel identity helper is managed through:

| Action | When to call | Code location |
|---|---|---|
| `identifyMixpanel(userId)` | On login, signup, or session restore | `src/analytics/mixpanel.ts` |

**Rules:**
- Call `identifyMixpanel()` with a stable, internal user ID.
- Never use PII (email, name, phone) in distinct_id.

---

## Mixpanel Tracking Plan

These are the Mixpanel events currently tracked in this project. **All new Mixpanel events must follow the same conventions.**

### Naming conventions

- Mixpanel event names: `snake_case`, past tense verb + noun (e.g., `nav_click`, `contact_submit`)
- Mixpanel property names: `snake_case` (e.g., `contact_type`, `topic`, `page_path`)
- No abbreviations in Mixpanel event or property names — use full words

### Current Mixpanel events

| Mixpanel Event | Trigger | Key Properties | File |
|---|---|---|---|
| `page_view` | React Router route navigation | `page_path`, `page_title`, `page_location` | `src/analytics/usePageTracking.ts` |
| `nav_click` | Clicking a main navigation link or logo | `destination`, `page_path` | `src/components/Header.tsx` |
| `contact_open` | Opening the contact modal or any contact method sub-form | `contact_type`, `source`, `page_path` | `src/components/Header.tsx`, `src/components/ContactModal.tsx`, `src/components/ContactCTA.tsx`, `src/components/Footer.tsx` |
| `contact_submit` | Form submission to WhatsApp or Email | `contact_type`, `topic`, `page_path` | `src/components/ContactModal.tsx` |
| `outbound_click` | Clicking an external resource (e.g. Phone, LinkedIn) | `link_label`, `link_url`, `source`, `page_path` | `src/components/ContactModal.tsx`, `src/components/ContactCTA.tsx`, `src/components/Footer.tsx` |
| `cta_click` | Clicking any CTA button (Hero, Section, etc.) | `cta_label`, `section`, `page_path` | `src/pages/Home.tsx`, `src/components/SectionCTA.tsx` |

---

## How to Add a New Mixpanel Event

1. **Check the tracking plan above** — if the Mixpanel event already exists, use it. Do not create duplicate Mixpanel events.
2. **Name the Mixpanel event** using the conventions above: `snake_case`, past tense, descriptive.
3. **Use the unified wrapper** — import `trackEvent` from `src/analytics/analytics.ts`. Do not import `mixpanel` directly.
4. **Update this file** — add the new Mixpanel event to the tracking plan table above.
5. **Verify in Mixpanel Live View** — confirm the event appears in Mixpanel with correct properties before considering it done.

### Mixpanel event template

```typescript
import { trackEvent } from "../analytics/analytics";

// Track custom user action
trackEvent("action_completed", {
  action_type: "custom_type",
  page_path: window.location.pathname,
});
```

---

## What Not to Do

- **Do not introduce other analytics tools.** All tracking goes through GTM and the unified analytics module.
- **Do not track PII as Mixpanel properties** — no emails, full names, phone numbers, IP addresses, or payment details in Mixpanel event properties.
- **Do not hardcode the Mixpanel project token outside of `mixpanel.ts`**.
