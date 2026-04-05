<div align="center">

# ≡ƒ¢í∩╕Å SwiftShield

### AI-Powered Income Protection for Q-Commerce Delivery Workers

*Parametric micro-insurance for Zepto, Blinkit & Swiggy Instamart delivery partners.*
*Instant payouts. Zero paperwork. Built for India's gig workforce.*

<br>

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)

<br>

| ΓÜí Instant Payouts | ≡ƒñû AI Fraud Detection | ≡ƒôì Zone-Based Triggers | ≡ƒô▒ No App Install |
|:------------------:|:---------------------:|:----------------------:|:-----------------:|
| UPI in 30 minutes | Isolation Forest ML | Real-time IMD + flood data | PWA web app |

</div>

<br>

---

## ≡ƒôï Table of Contents

- [Problem Addressed](#-problem-addressed)
- [How It Works ΓÇö Ramesh's Story](#-how-it-works--rameshs-story)
- [Platform Choice](#-platform-choice-web-app)
- [Insurance Policy](#-insurance-policy)
  - [Coverage Scope](#1-coverage-scope)
  - [Weekly Plan Tiers](#2-weekly-plan-tiers)
  - [Parametric Triggers](#3-parametric-triggers)
  - [Payout Calculation](#4-payout-calculation)
  - [Eligibility & Exclusions](#5-eligibility--exclusions)
  - [Claim Process & Limits](#6-claim-process--limits)
  - [Pause + Credit Wallet](#7-pause--credit-wallet)
- [Fraud Detection Framework](#-fraud-detection--validation-framework)
- [Anti-Spoofing Defense](#-advanced-anti-spoofing--adversarial-defense)
- [Features](#-features)
  - [AI Risk Assessment](#1-ai-powered-risk-assessment)
  - [Parametric Automation](#2-parametric-automation)
  - [Analytics Dashboard](#3-analytics-dashboard)
- [Admin Roles](#-admin-roles--responsibilities)
- [Onboarding Flow](#-onboarding-flow)
- [End-to-End Claim Flow](#-end-to-end-claim-flow)
- [Tech Stack](#-tech-stack)
- [Integration Adapters](#-integration-adapters)
- [Development Plan](#-development-plan)
- [Demo Routes](#-demo-routes)
- [Privacy & Compliance](#-privacy--compliance)
- [Getting Started](#-getting-started)

---

## ≡ƒÄ» Problem Addressed

Q-commerce delivery workers (Zepto, Blinkit, Swiggy Instamart) operate on **10-minute delivery SLAs** across India's metro cities. A single weather disruption or curfew can collapse an entire work slot ΓÇö with no safety net.

Existing insurance products are too slow, too complex, and too expensive for daily-wage gig workers.

```
Workers lose Γé╣200ΓÇô500 per disruption event with zero recourse.
```

SwiftShield solves this with automated **parametric income protection**: when a trigger event is detected in a worker's zone, the system validates, approves, and pays out ΓÇö in minutes, not days ΓÇö with no manual claim filing.

> **Target Persona:** Zepto, Blinkit, and Swiggy Instamart delivery partners in Mumbai, Delhi NCR, Bengaluru, and Hyderabad earning Γé╣400ΓÇô800/day.

---

## ≡ƒºæΓÇì≡ƒÆ╝ How It Works ΓÇö Ramesh's Story

> *Ramesh is a Blinkit delivery partner in Bengaluru's Koramangala zone.*
> *He earns ~Γé╣600/day and has the Shield plan active (Γé╣59/week).*

**8:40 PM, Tuesday.** Heavy rainfall crosses 15 mm/hr in his zone.

```
Trigger detected  ΓåÆ  Pre-filled claim drafted  ΓåÆ  Confirmation prompt shown
```

Ramesh sees on his dashboard:

> *"We detected a heavy rain alert in your zone. Confirm impact to receive payout."*

He taps confirm. In the background:

| Γ£à Check | Result |
|---------|--------|
| GPS zone match | Pass |
| Blinkit session proof (active before trigger) | Pass |
| 48-hour cooling window | Clear |
| ML anomaly score | Low risk |

**Within 30 minutes ΓÇö Γé╣85 credited to his UPI account. SMS confirmed.**

> ≡ƒÆí Ramesh did not file a claim. He did not read a policy document. He did not call anyone. **The system did it for him.**

---

## ≡ƒîÉ Platform Choice: Web App

SwiftShield is built as a **Next.js web application** ΓÇö not a native mobile app. This is deliberate.

| Reason | Benefit |
|--------|---------|
| No install required | Any device, any browser |
| Rapid iteration | No native build overhead |
| PWA support | Near-native mobile feel |
| Admin dashboard | Better suited to web |

---

## ≡ƒôä Insurance Policy

### 1. Coverage Scope

SwiftShield provides **AI-powered parametric income protection** for Q-commerce delivery workers.

```
Γ£à  COVERED     ΓåÆ  Income loss due to verified external disruptions
Γ¥î  NOT COVERED ΓåÆ  Health ┬╖ Accidents ┬╖ Life ┬╖ Vehicle damage ┬╖ Personal negligence
```

---

## 2. Weekly Plan Tiers

<div align="center">

|  | ≡ƒƒó Starter | ≡ƒö╡ Shield | ≡ƒƒú Pro |
|--|:----------:|:---------:|:------:|
| **Weekly Premium** | Γé╣29 | Γé╣59 | Γé╣99 |
| **Income Coverage** | 50% | 70% | 90% |
| **Daily Cap** | Γé╣500 | Γé╣1,200 | Γé╣2,000 |
| **Weekly Max** | Γé╣1,500 | Γé╣3,600 | Γé╣6,000 |
| **Triggers** | Rain ┬╖ Heat ┬╖ Fog  |  All except Platform Outage  | All + Platform Outage |
| **Claim Wait** | 2 hrs | 1 hr | 30 min |

</div>

---

### 3. Parametric Triggers

| ID | Trigger | Condition | Data Source | Payout |
|:--:|---------|-----------|-------------|:------:|
| `T1` | ≡ƒîº∩╕Å **Heavy Rainfall** | Rainfall > 15 mm/hr | IMD API | **Γé╣85/hr** |
| `T2` | ≡ƒîí∩╕Å **Extreme Heat** | Temp > 42┬░C for 3+ hrs | OpenWeatherMap | **Γé╣70/hr** |
| `T3` | ≡ƒîè **Flash Flood** | Flood sensor + GPS zone match | Flood sensor feed | **Γé╣100/hr** |
| `T4` | ≡ƒî½∩╕Å **Cold / Dense Fog** | Visibility < 50m or temp < 5┬░C | OpenWeatherMap | **Γé╣70/hr** |
| `T5` | ≡ƒÜº **Curfew / Strike** | Govt. advisory + GPS zone blockage | Govt. advisory + platform APIs | **Γé╣90/hr** |
| `T6` | ≡ƒÆ╗ **Platform Outage** ΓÜá∩╕Å *Pro only* | Platform down > 30 min | Platform status APIs | **Γé╣90/hr** |

> **ΓÜá∩╕Å Note on T6 (Pro Only):** In the demo, T6 uses simulated platform status logs. In production, validation uses public status pages (e.g., `status.blinkit.com`), order API failure rate monitoring, and cross-worker signal correlation ΓÇö if >30% of active workers in a zone stop receiving orders simultaneously, that constitutes evidence of a platform disruption.

---

### 4. Payout Calculation

Payout amounts are dynamically calculated using AI inputs:

- ≡ƒôè Worker earnings history
- ≡ƒòÉ Time slot demand ΓÇö breakfast / lunch / dinner
- ≡ƒôì Location-based order density
- ≡ƒô▒ Platform activity at time of disruption

---

### 5. Eligibility & Exclusions

**To receive a payout, the worker must:**

- Γ£à Be **active** (logged into platform) at the time of disruption
- Γ£à Be **present in the affected zone**
- Γ£à Be **available for orders**
- Γ£à Pass all **fraud validation checks**

**Claims will be rejected if:**

- Γ¥î Worker was not active during the disruption
- Γ¥î Location mismatch is detected
- Γ¥î Fraud signals are triggered
- Γ¥î Duplicate claim is submitted for the same event

**Not covered under any plan:** War ┬╖ Terrorism ┬╖ Pandemic ┬╖ Health ┬╖ Accidents ┬╖ Vehicle repairs

---

### 6. Claim Process & Limits

```
Trigger Detected  ΓåÆ  AI Validation  ΓåÆ  Instant UPI Payout  ΓåÆ  SMS Confirmation
```

- **Fully automated** ΓÇö no manual filing required
- Daily payout capped per plan
- **Weekly max payout = 3├ù daily cap**

---

### 7. Pause + Credit Wallet

SwiftShield offers a flexible wallet system for gig workers:

- ΓÅ╕∩╕Å **Pause anytime** ΓÇö except during an active claim window or disruption
- ≡ƒÆ│ **Unused premium** ΓåÆ converted to wallet credit automatically
- ≡ƒöÆ Wallet balance usable for **future premiums only** ΓÇö non-withdrawable

**Example walkthrough:**

```
Week 1 premium:    Γé╣100
Days used:         3 of 7
Unused days:       4
Wallet credited:   Γé╣60 (pro-rated)

Week 2 premium:    Γé╣90
Wallet applied:   -Γé╣60
You pay:           Γé╣30  Γ£à
```

---

## ≡ƒöÉ Fraud Detection & Validation Framework

SwiftShield uses a **multi-layer intelligent fraud detection system** ΓÇö payouts are only made to genuine, active workers.

### 4-Layer Claim Approval System

> Every claim must pass **all four layers** before auto-approval.

```
ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
Γöé  Layer 1 Γöé GPS zone polygon match                               Γöé
Γöé          Γöé Worker must be within 500m of disruption zone        Γöé
Γö£ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöñ
Γöé  Layer 2 Γöé Platform activity validation                         Γöé
Γöé          Γöé Zepto / Blinkit / Instamart API confirms active      Γöé
Γöé          Γöé session existed BEFORE trigger fired                 Γöé
Γö£ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöñ
Γöé  Layer 3 Γöé Presence before disruption                           Γöé
Γöé          Γöé Worker must have been in zone before the alert       Γöé
Γöé          Γöé Prevents zone entry post-trigger                     Γöé
Γö£ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöñ
Γöé  Layer 4 Γöé ML anomaly score                                     Γöé
Γöé          Γöé Claim frequency vs pin-code peer group               Γöé
Γöé          Γöé Model: Isolation Forest                              Γöé
ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
```

### Detection Signal Comparison

| Signal | Γ£à Genuine Worker | ≡ƒÜ¿ Suspicious Behavior |
|--------|:-----------------:|:----------------------:|
| Movement | Continuous, realistic | Static or impossible speed jumps |
| Activity | Active orders | No real order activity |
| Timing | Present before event | Appears only after trigger |
| Claim frequency | Normal for zone | Burst claims or repeated max claims |

### Fraud Ring Detection

Coordinated attacks are flagged by:
- Multiple workers filing near-identical claims (same zone, time window, duration)
- Sudden zone-wide claim spikes
- Cluster analysis on behavioral features

> **ΓÜí Liquidity Circuit Breaker:** During a burst, payouts are **queued ΓÇö not rejected** ΓÇö while fraud analysis runs. Genuine workers' claims are preserved and paid after validation.

### Fairness for Honest Workers

```
Medium-risk claim detected
        Γöé
        Γö£ΓöÇΓåÆ  Soft-hold (NOT outright rejection)
        Γöé
        Γö£ΓöÇΓåÆ  Step-up verification requested:
        Γöé       ΓÇó Keep location active for 5ΓÇô10 min
        Γöé       ΓÇó OR tap one-tap live check-in
        Γöé
        ΓööΓöÇΓåÆ  Claim released after verification passes Γ£à
```

---

## ≡ƒ¢í∩╕Å Advanced Anti-Spoofing & Adversarial Defense

SwiftShield defends against sophisticated attacks ΓÇö **GPS spoofing and coordinated ring attacks** ΓÇö that single-signal systems cannot catch.

### Multi-Dimensional Signal Validation

| Signal Category | What's Checked |
|----------------|----------------|
| **Movement trajectory** | Anti-teleport check ┬╖ Impossible speed detection ┬╖ GPS jitter analysis |
| **Network corroboration** | IP geolocation vs. declared zone ┬╖ ASN & carrier consistency ┬╖ Latency heuristics |
| **Device integrity** | Mock-location flag ┬╖ Emulator / rooted device detection ┬╖ Device fingerprint consistency |
| **Platform activity proofs** | On-duty status from platform API ┬╖ Last delivery timestamp ┬╖ Heartbeat continuity pre-event |

> A fraudster who spoofs GPS still needs to pass network, device, and platform checks ΓÇö **all independently**.

### Duplicate Claim Prevention

| Mechanism | How It Works |
|-----------|-------------|
| **Idempotency key** | De-duplication by `(workerId, triggerType, disruptionId)` ΓÇö same event can't yield two payouts |
| **48-hr cooling window** | No new claim within 48 hours of last payout |
| **Ring detection** | Near-identical claims across many workers in same window triggers fraud alert |

### AI-Driven Anomaly Detection

| Model | Purpose |
|-------|---------|
| **Isolation Forest** | Detects individual behavioral anomalies ΓÇö no labelled fraud data required |
| **Clustering** | Identifies coordinated fraud groups |
| **Dynamic thresholds** | Tighten during spikes; calibrated per pin-code peer group ΓÇö not globally |

### Liquidity Protection Mechanism

```
Ring burst detected in Zone X
         Γöé
    ΓöîΓöÇΓöÇΓöÇΓöÇΓû╝ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
    Γöé  Payouts QUEUED (not rejected)      Γöé
    Γöé  Fraud analysis runs across claims  Γöé
    ΓööΓöÇΓöÇΓöÇΓöÇΓö¼ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
         Γöé
    ΓöîΓöÇΓöÇΓöÇΓöÇΓû╝ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
    Γöé  Genuine workers  ΓåÆ  Paid in full   Γöé
    Γöé  Fraudulent claims ΓåÆ Rejected +     Γöé
    Γöé  reason logged for audit            Γöé
    ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
```

---

## Γ£¿ Features

### 1. AI-Powered Risk Assessment

#### Dynamic Weekly Premium Engine

Premiums recalculate **every Sunday** using a Gradient Boosting **(XGBoost)** model.

**Model Inputs:**

| Input | Description |
|-------|-------------|
| Zone flood & heat history | Historical disruption frequency |
| 7-day forecast risk | OpenWeatherMap upcoming data |
| Worker earnings average | 4-week rolling baseline |
| Pin-code claim rate | Historical claims in the area |
| Seasonal event frequency | Strike/curfew patterns by city |
| City-tier risk factor | Metro vs tier-2 weighting |
| Vehicle & platform profile | 2-wheeler / e-bike + platform risk |

**Model Outputs:**
- `weeklyPremium` (Γé╣)
- Top 3 plain-language explanations of pricing factors
- Week-on-week delta with **fairness cap** (no sudden spikes)

> **Cold start:** New workers fall back to a pin-code peer group prior ΓÇö updated as the worker builds 4 weeks of history.

#### Persona-Based Weekly Risk Score

Each worker receives a `weeklyRiskScore` (0ΓÇô100):

| Component | Source |
|-----------|--------|
| ≡ƒîº∩╕Å Weather exposure risk | Assigned zone + current season |
| ≡ƒÜª Traffic risk | Zone congestion + typical shift timing |
| ≡ƒôª Behavior risk | Activity patterns, active hours, delivery volume |
| ≡ƒöì Fraud risk | Claim frequency vs peer group + anomaly flags |

---

### 2. Parametric Automation

#### Real-Time Trigger Monitoring

The trigger engine polls all data sources **every 10 minutes**.

**Data sources:**
- `IMD API / OpenWeatherMap` ΓÇö rainfall, temperature, visibility, fog
- `Flood sensor feed` ΓÇö waterlogging + GPS zone cross-match
- `Government advisory API` ΓÇö curfew and civil strike alerts

Each zone carries an active disruption state:

```
Zone Status: { start_time, severity: green | amber | red, end_time }
```

#### Automatic Claim Initiation

When a **red-alert** disruption is detected, the system automatically:

1. Identifies all active policyholders in that zone on-duty during the trigger window
2. Generates a pre-filled draft claim (trigger type, time window, estimated lost hours)
3. Surfaces a one-tap confirmation prompt on the worker's dashboard

#### Payout State Machine

```
pending ΓöÇΓöÇΓû║ approved ΓöÇΓöÇΓû║ processing ΓöÇΓöÇΓû║ paid Γ£à
                              Γöé
                              ΓööΓöÇΓöÇΓû║ rejected Γ¥î  (fraud detected)
```

- Auto-approved claims: UPI payout via Razorpay sandbox within minutes
- Dashboard + SMS updated on confirmation
- Rejected claims: reason shown with option to appeal

---

### 3. Analytics Dashboard

<table>
<tr>
<td width="50%" valign="top">

**≡ƒæñ Worker View**

- Total income protected this week (Γé╣)
- Active plan and weekly premium paid
- Weekly risk score with top 3 plain-language drivers
- Claim history ΓÇö trigger type ┬╖ payout ┬╖ status ┬╖ timestamp

</td>
<td width="50%" valign="top">

**≡ƒÅó Admin / Insurer View**

- Zone-level disruption heatmap + claim density
- Loss ratio per zone (payouts ├╖ premiums)
- Fraud queue with anomaly scores + flagged signals
- Predictive claim volume (weather-driven)
- Liquidity pool health ΓÇö burn rate vs pool balance
- Ring detection alerts for manual review

</td>
</tr>
</table>

---

## ≡ƒæÑ Admin Roles & Responsibilities

SwiftShield operates a **two-tier admin model**. Zonal Admins manage operations within their zone; Control Admins have platform-wide authority.

<table>
<tr>
<td width="50%" valign="top">

### ≡ƒù║∩╕Å Zonal Admin
*Zone-scoped operations*

---

**≡ƒôì Claim Management**
- Review auto-triggered claims within assigned zone
- Approve, reject, or flag claims based on validation checks
- Ensure payouts align with actual income loss

**≡ƒºá Fraud Monitoring**
- Investigate AI-flagged suspicious claims
- Detect GPS spoofing, duplicate claims, abnormal patterns
- Mark users as high-risk when warranted

**ΓÜá∩╕Å Escalation Handling**
- Escalate complex fraud cases to Control Admin
- Freeze or hold payouts for suspicious claims
- Initiate manual verification when required

**≡ƒôè Zone Analytics**
- Track claim frequency and fraud rate within zone
- Monitor loss ratios
- Identify high-risk areas and patterns

**≡ƒöÉ Access**
```
Zone-specific data only
Cannot modify policies or pricing
```

</td>
<td width="50%" valign="top">

### ΓÜÖ∩╕Å Control Admin
*Platform-wide authority*

---

**≡ƒº╛ Policy Management**
- Create and update T&C, Privacy Policy, coverage rules
- Define eligibility criteria and claim conditions

**≡ƒÆ░ Pricing & Risk Strategy**
- Set and update weekly premium rates
- Adjust payout limits and coverage tiers
- Override AI-based pricing decisions

**≡ƒºá AI & Fraud Governance**
- Configure fraud detection rules and thresholds
- Manage risk scoring models
- Deploy and update anti-spoofing strategies

**≡ƒÜ¿ Crisis & System Control**
- Handle large-scale fraud attacks
- Apply emergency rules (strict validation, payout delay)
- Control system-wide claim processing

**≡ƒôè Global Analytics**
- Monitor total claims, fraud trends, revenue vs. payouts
- Predict future risks and disruptions

**≡ƒöÉ Access**
```
Full access ΓÇö all zones and data
Override claim decisions
Block users or entire regions
Modify system-wide configurations
```

</td>
</tr>
</table>

---

## ≡ƒÜÇ Onboarding Flow

> Designed to take **under 2 minutes** on a mobile browser. Zero document uploads.

```
Step 1 ΓöÇΓöÇΓû║ Platform Selection
           Choose Zepto ┬╖ Blinkit ┬╖ Swiggy Instamart
           (determines which partner API adapter is used)
           Γöé
Step 2 ΓöÇΓöÇΓû║ Phone OTP Login
           6-digit OTP ┬╖ No password ┬╖ No email
           Γöé
Step 3 ΓöÇΓöÇΓû║ Zone & Vehicle
           Delivery pin code + vehicle type (2-wheeler / e-bike)
           (feeds directly into premium calculation model)
           Γöé
Step 4 ΓöÇΓöÇΓû║ Plan Selection
           Personalised weekly premium per tier shown
           Top 3 risk drivers explained in plain language
           Γöé
Step 5 ΓöÇΓöÇΓû║ UPI Linking
           Only financial detail collected
           Γöé
Step 6 ΓöÇΓöÇΓû║ Activation Γ£à
           First week's premium deducted
           Coverage begins immediately
```

---

## ≡ƒöä End-to-End Claim Flow

```
IMD / OpenWeather       Flood Sensor Feed       Govt. Advisory API
  (rain, temp, fog)     (waterlogging + GPS)    (curfew / strike)
        Γöé                       Γöé                       Γöé
        ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö┤ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                                Γöé
                    ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓû╝ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
                    Γöé   Real-time Trigger    Γöé
                    Γöé   Engine (polls 10min) Γöé
                    ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö¼ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                                Γöé Disruption event raised
                    ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓû╝ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
                    Γöé   Fraud Detection      Γöé
                    Γöé   4-layer check        Γöé
                    Γöé   (all 4 must pass)    Γöé
                    ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö¼ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö¼ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                         Pass      Flag
                  ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓû╝ΓöÇΓöÇΓöÇΓöÉ  ΓöîΓöÇΓöÇΓû╝ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
                  Γöé  Auto-    Γöé  Γöé  Manual Review  Γöé
                  Γöé  Approved Γöé  Γöé  Queue (admin)  Γöé
                  ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö¼ΓöÇΓöÇΓöÇΓöÿ  ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                          Γöé
                  ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓû╝ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
                  Γöé  Instant Payout    Γöé
                  Γöé  UPI / Razorpay    Γöé
                  Γöé  Dashboard + SMS   Γöé
                  ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓö¼ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
                          Γöé
                  ΓöîΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓû╝ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÉ
                  Γöé  Analytics         Γöé
                  Γöé  Worker: earnings  Γöé
                  Γöé  Admin: heatmaps   Γöé
                  ΓööΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÿ
```

---

## ≡ƒ¢á∩╕Å Tech Stack

<div align="center">

| Layer | Technology |
|:-----:|:----------:|
| **Frontend** | Next.js + Tailwind CSS |
| **Backend** | Node.js / Next.js API Routes |
| **Database** | Supabase (PostgreSQL) |
| **AI / ML** | Python + FastAPI |
| **ML Libraries** | Scikit-learn ┬╖ XGBoost ┬╖ Isolation Forest |
| **Maps** | Mapbox / Google Maps |
| **Payments** | Razorpay Test / Sandbox |
| **Auth** | Supabase Auth |
| **Hosting** | Vercel (frontend) + Render (ML service) |

</div>

---

## ≡ƒöî Integration Adapters

> All integrations follow an **adapter pattern** ΓÇö mock providers are used in demo; real providers swap in without changing application logic.

| Integration | ≡ƒº¬ Demo Provider | ≡ƒÜÇ Production Provider |
|-------------|:----------------:|:----------------------:|
| Weather data | Mock + OpenWeatherMap free tier | IMD API ┬╖ OpenWeatherMap paid |
| Flood / waterlogging | Mock sensor feed | Municipal flood sensor networks |
| Curfew / civil strike | Mock advisory feed | Government advisory APIs |
| Platform session proof | Simulated adapter | Zepto ┬╖ Blinkit ┬╖ Swiggy Instamart Partner APIs |
| Payments | Razorpay sandbox | Razorpay live ┬╖ UPI rails |
| Auth | Supabase Auth + OTP simulation | Supabase Auth + real SMS OTP |

---

## ≡ƒôà Development Plan

| Week | Theme | Focus Areas | Key Deliverable |
|:----:|:-----:|-------------|----------------|
| **W1** Mar 4ΓÇô10 | ≡ƒÅù∩╕Å Foundation | DB schema ┬╖ Supabase auth ┬╖ OTP login ┬╖ zone/platform model | Working `/login` route ┬╖ schema committed |
| **W2** Mar 11ΓÇô20 | ≡ƒÆí Ideation | Premium engine (mock ML) ┬╖ trigger skeleton ┬╖ dashboard wireframes | README + prototype video by Mar 20 |
| **W3** Mar 21ΓÇô27 | ΓÜÖ∩╕Å Automation | Trigger polling ┬╖ mock API adapters ┬╖ claim state machine | Live trigger ΓåÆ claim flow demo |
| **W4** Mar 28ΓÇôApr 4 | ≡ƒ¢í∩╕Å Protection | Dynamic premium ML (XGBoost) ┬╖ risk score ┬╖ Razorpay payout | End-to-end claim ΓåÆ payout demo |
| **W5** Apr 5ΓÇô11 | ≡ƒôê Scale | Isolation Forest ┬╖ GPS validation ┬╖ ring detection ┬╖ circuit breaker | Fraud detection demo with spoofing scenario |
| **W6** Apr 12ΓÇô17 | Γ£¿ Polish | Admin dashboard ┬╖ analytics heatmaps ┬╖ pitch deck ┬╖ demo video | Final submission package |

---

## ≡ƒù║∩╕Å Demo Routes

| Route | Description |
|:-----:|-------------|
| [`/login`](http://localhost:3000/login) | Platform selection (Zepto / Blinkit / Swiggy Instamart) + OTP login simulation |
| [`/dashboard`](http://localhost:3000/dashboard) | Worker view ΓÇö active plan ┬╖ premium ┬╖ risk score ┬╖ claim history ┬╖ payouts |
| [`/simulate`](http://localhost:3000/simulate) | Trigger zone disruptions ┬╖ submit claims ┬╖ view fraud validation outcome |

---

## ≡ƒöÆ Privacy & Compliance

<table>
<tr>
<td width="50%" valign="top">

**Data Collected**
- GPS location
- IP address
- Work activity (orders, login time)
- Earnings history
- Device metadata

**Data Usage**
- Risk scoring
- Claim validation
- Fraud detection
- Premium calculation

</td>
<td width="50%" valign="top">

**Data Sharing**

Shared with:
- Insurance providers
- Platform partners (Blinkit ┬╖ Zepto ┬╖ Instamart)
- Fraud detection systems

> Γ¥î Personal data is **never sold**

**User Rights**
- Request data deletion at any time
- Opt out (policy becomes inactive)

</td>
</tr>
</table>

**Data Security:** Encrypted storage ┬╖ Secure APIs ┬╖ Role-based access control

**Compliance Model:** SwiftShield operates as a fully parametric insurance model ΓÇö no manual claims, transparent payout logic, weekly pricing aligned with the gig economy.

---

## ΓÜí Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Alternatively
yarn dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

<div align="center">

Built with Γ¥ñ∩╕Å for India's gig workforce &nbsp;┬╖&nbsp; SwiftShield 2026

</div>
