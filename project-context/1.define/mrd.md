# Market Research Document (MRD)

## Research Query Structure

**Primary Focus**: Agentic digital literacy platform for seniors — a multi-agent AI system that provides personalized, patient, step-by-step technology tutoring, scam-awareness coaching, and ongoing support for adults aged 60+.

**Selected Runtime** (Build-phase recommendation): `crewai` (default; no `aamad.config.yml` present at research time)

---

## Executive Summary

The market for technology services and training aimed at older adults is large, growing, and structurally driven by demographic change rather than cyclical demand. The global population aged 60+ reached approximately 1.22 billion in 2025 and is projected to reach 2.11 billion by 2050 (UN DESA, 2024). Adjacent market segments — senior tech services (~$11.5B in 2025, QY Research), digital inclusion training (~$15B in 2025, FutureDataStats), and the broader AgeTech sector (~$286B in 2026, SilverEconomy.com) — all show high single- to low double-digit CAGR through the early 2030s. Digital literacy is increasingly framed as a health and independence imperative, not merely a convenience (GetSetUp, 2025; McKnight's Senior Living, 2025).

Despite high device ownership — roughly 9 in 10 U.S. adults 50+ own smartphones (AARP, 2025) — a persistent confidence and skills gap remains. One-third of older adults do not feel they have the digital literacy skills to fully benefit from being online, and comfort declines sharply with age (AARP, 2024). Privacy, scam fear, and age-inappropriate design are top barriers (AARP, 2025; OATS, 2025). Reported fraud losses among Americans 60+ reached $7.75 billion in 2025, a 59% year-over-year increase (FBI IC3, 2025), creating urgent demand for trustworthy, plain-language digital safety coaching alongside skills training.

Technical feasibility for an agentic tutoring system is strong. Recent multi-agent intelligent tutoring architectures (ITAS, IntelliCode, AIA-PAL, ELA Tutor) demonstrate proven patterns: centralized learner-state orchestration, specialized pedagogical/scaffolding/safety agents, RAG-grounded content, and human-in-the-loop escalation. Existing competitors (TechMaid, TechMentor Companion, OLAI, GetSetUp/Helen) validate demand for AI-assisted senior tech support but leave gaps in **true multi-agent specialization** (tutor + safety coach + progress tracker + family/caregiver liaison), **cross-device continuity**, **adaptive pacing for cognitive and motor decline**, and **B2B2C distribution** through health plans, senior living, and libraries.

**Recommended approach (dual-track — see §6 Gap Analysis)**: Market demand supports **both** a capital-intensive agentic platform path and a **near-zero founder-cost community assembly path**. For founders avoiding custom software and dedicated venues at launch, the lowest-cost sequence is: (1) pilot at one partner site with existing space and seniors, (2) use free public curricula as the lesson backbone, (3) recruit volunteer facilitators, (4) use partner-owned or loaner devices, (5) add custom AI tooling **only after demand is proven** (Harvard GSE / LeadingAge practice patterns).

**Capitalized product path** (if/when custom tooling is justified): MVP agentic platform targeting U.S. adults 65+, differentiated by patient multi-agent tutoring, integrated scam-awareness coaching, accessibility-first UX (WCAG 2.1 AA+), and optional human escalation — with RAG grounded in **free public curricula** (DigitalLearn, Tech Boomers, Senior Planet) where possible rather than net-new content authoring.

**Immediate gap to resolve**: Stakeholder has not confirmed which track leads — community pilot ($0–5K coordination) vs. engineered MVP ($150–250K per prior estimate). PRD v1.1 assumes custom PWA; this MRD revision flags misalignment until resolved.

---

## Detailed Findings by Dimension

### 1. Market Analysis & Opportunity Assessment

#### Key Insights

1. **Demographic tailwind is structural and global.** The 60+ population is growing ~72% from 2025 to 2050, with faster growth in lower-middle-income countries (UN DESA, 2024). Older adults already represent 15%+ of global adult internet users and over half of consumer spending in the U.S., UK, and EU (DataReportal, 2025).

2. **Device adoption has outpaced skill confidence.** Smartphone ownership among U.S. 50+ rose from ~35% in 2016 to ~90% in 2025, yet only two-thirds feel they have skills to fully use online services, dropping with age (AARP, 2024–2025). This "ownership without mastery" gap is the core product opportunity.

3. **Digital safety is a primary adoption blocker and monetizable wedge.** 25% of 50+ cite lack of trust/privacy as greatest tech barrier (OATS, 2025). Elder fraud losses hit $7.75B in 2025 (FBI IC3). An agentic tutor that proactively coaches scam recognition addresses both fear and financial risk.

4. **Competitive landscape is fragmented; AI-native entrants are emerging but immature.** Incumbents include nonprofit class-based models (Senior Planet/OATS, GetSetUp), concierge human support (Geek Squad, AARP phone support), and new AI-first apps (TechMaid, TechMentor, OLAI). None combine full multi-agent orchestration with measurable literacy progression and institutional distribution at scale.

5. **B2B2C channels offer faster scale than pure D2C.** GetSetUp serves health plans and state aging departments; OATS reached 276,000 interactions in 2024 via partner licensing (OATS, 2025). Medicare Advantage plans seeking STAR rating improvements and telehealth adoption represent high-value enterprise buyers.

#### Data Points

| Metric | Value | Source |
|--------|-------|--------|
| Global population 60+ (2025 → 2050) | 1.22B → 2.11B | UN DESA / WPP 2024 |
| Senior Tech Service market (2025 → 2032) | $11.52B → $22.62B, CAGR 10.3% | QY Research, 2025 |
| Digital Inclusion Training market (2025 → 2033) | $15B → $40B, CAGR 12% | FutureDataStats, 2025 |
| Global AgeTech market (2026) | $286.4B, CAGR 10.4% (2026–31) | SilverEconomy.com, 2026 |
| U.S. 50+ smartphone ownership | ~90% (2025) | AARP, 2025 |
| U.S. 50+ lacking digital literacy confidence | ~33% | AARP, 2024 |
| U.S. 60+ fraud losses (2025) | $7.75B (+59% YoY) | FBI IC3, 2025 |
| U.S. 50+ AI platform usage | ~30% (2025), nearly doubled from 2024 | AARP, 2025 |
| GetSetUp class attendances (2024) | 4M+ live/on-demand | GetSetUp, 2025 |
| GetSetUp digital confidence improvement | 56% report improved comfort | GetSetUp, 2025 |
| Cross-national senior survey (Q1 2026) | n=15,280 across 5 countries | Zenodo / Facil.guide, 2026 |

#### Source Citations

- UN DESA Policy Brief 186 / World Population Prospects 2024 (Feb 2026; data through 2025)
- AARP 2024 and 2025–2026 Tech Trends reports (n=2,712–3,838 U.S. adults 50+)
- FBI Internet Crime Complaint Center (IC3) Annual Report 2025
- QY Research Senior Tech Service Market Outlook 2025
- FutureDataStats Digital Inclusion Training Market 2025
- SilverEconomy.com AgeTech Market Report 2026
- GetSetUp 2025 Active Aging Report
- DataReportal Digital 2025: Senior Surfers
- Senior Technology Adoption Survey, Zenodo 2026

#### Implications

- **Target persona**: Adults 65–79 first (highest device use + largest skill gap); extend to 80+ with voice-first and family-assisted modes.
- **Value proposition**: "A patient digital coach available 24/7" — not another class catalog or generic chatbot.
- **Pricing**: Consumer tier $9.99–$19.99/month; institutional licensing $3–8 PMPM for health plans/senior living.
- **Geography**: Launch U.S. English; plan localization using Facil.guide cross-national data (privacy concerns higher in France; data costs in Brazil).

---

### 2. Technical Feasibility & Requirements Analysis

#### Key Insights

1. **Multi-agent tutoring architectures are production-viable.** ITAS (Cloud Run microservices + specialist agents + synthesizer), IntelliCode (centralized StateGraph learner model), and AIA-PAL (CrewAI + LangGraph dual-layer) provide reference patterns for coordinator + specialist agent decomposition.

2. **`crewai` is a strong MVP runtime fit.** Sequential process mode supports reproducible tutoring flows; YAML-externalized agents/tasks align with AAMAD Build conventions; `max_iter` and guardrails can enforce step-by-step pacing and content safety. Claude Agent SDK suits screen-sharing/voice flows later; Cursor SDK is IDE-oriented and less suited for end-user senior tutoring.

3. **RAG over curated content is essential to reduce hallucination risk.** Seniors cannot tolerate incorrect instructions (e.g., wrong banking steps). Ground agents in verified tutorials (Senior Planet–style content, device OEM guides, scam databases from IC3/AARP).

4. **Integration surface is moderate for MVP.** Core needs: LLM API, vector store for RAG, session/learner-state DB, optional speech-to-text/text-to-speech, and webhook to human support queue. Screen-sharing (TechMentor model) adds mobile OS permissions complexity — defer to Phase 2.

5. **Scalability bottlenecks are LLM cost and latency, not compute.** Average senior sessions may be longer and more multi-turn than typical chat. Budget caps per session and progressive model routing (small model for FAQ, large model for complex troubleshooting) are required.

#### Data Points

| Factor | Estimate / Finding |
|--------|-------------------|
| ITAS pilot scale | 334 chat turns, 10,628 events, 1 semester | arXiv ITAS, 2026 |
| IntelliCode agents | 6 specialized agents + centralized learner state | arXiv, Dec 2025 |
| WebAIM Million 2025 | 94.8% homepages fail WCAG 2 | WebAIM, 2025 |
| Recommended touch target | ≥44×44 dp/pt | WCAG 2.1 / senior UX research |
| Minimum body text | ≥16px, 4.5:1 contrast | WCAG 2.1 AA |

#### Source Citations

- ITAS: Multi-Agent Architecture for LLM-Based Intelligent Tutoring (arXiv, 2026)
- IntelliCode: Centralized Learner Modeling (arXiv, 2025)
- AIA-PAL: CrewAI + LangGraph framework (ScienceDirect, 2025)
- ELA Tutor: RL Meta-Agent ITS (MDPI Applied Sciences, 2025)
- W3C WCAG 2.1 and WAI Older Users guidance
- ACM Transactions on Accessible Computing: Accessible Web Design for Older Adults (2025)

#### Implications

- **Recommended agent roles (MVP)**: Coordinator, Step-by-Step Tutor, Safety/Scam Coach, Progress Tracker, Escalation Handler (human handoff).
- **Runtime**: `crewai` for MVP; evaluate `claude-agent-sdk` for voice/screen Phase 2.
- **Infrastructure**: Single-service or compose stack; Postgres for learner state; Redis optional for session cache; object storage for tutorial media.
- **Cost model**: At 50K MAU × 10 sessions/month × ~2K tokens/session → significant LLM spend; institutional B2B needed for unit economics.

---

### 3. User Experience & Workflow Analysis

#### Key Insights

1. **Preferred learning modalities vary by age cohort.** Ages 60–69 prefer video tutorials; 75+ prefer family-mediated learning (Zenodo survey, 2026). Agentic system should support voice, text, and "show my caregiver" share modes.

2. **Top use cases are relational and practical, not technical.** Video calling, online banking, telehealth, email, and scam avoidance dominate (AARP, 2025; Facil.guide, 2026). Product onboarding must start from life goals, not device specs.

3. **Cognitive load management is the primary UX challenge.** One step at a time, plain language, no time pressure, repeatable instructions, and "simpler explanation" fallback (OLAI pattern) are table stakes.

4. **Human-in-the-loop remains necessary.** Complex account recovery, grief-related confusion, and fraud in progress require human escalation within minutes to hours (TechMaid 24-hour callback model).

5. **Family caregivers are secondary users.** Adult children set up accounts and monitor progress; privacy boundaries must be explicit (senior controls sharing).

#### Data Points

| Behavior | Statistic |
|----------|-----------|
| U.S. 50+ digital services used (avg.) | 14 services / 3 months | AARP, 2025 |
| U.S. 50+ tech spend (2025) | $756 average | AARP, 2025 |
| Online banking adoption drop (60–64 vs 75–79) | 15–20 percentage points | Zenodo, 2026 |
| GetSetUp loneliness reduction | 35% feel less lonely | GetSetUp, 2025 |
| TechMentor pricing reference | $9.99 Standard / $19.99 Premium | App Store, 2025 |

#### Source Citations

- AARP 2025–2026 Tech Trends
- OLAI product documentation (2025)
- TechMentor Companion App Store listing (2025)
- Zenodo Senior Technology Adoption Survey (Q1 2026)
- OATS Digital Wellness case study (2025)

#### Implications

- **UI**: Large typography, high contrast, voice input, minimal navigation depth (≤3 levels).
- **Onboarding**: Goal-based ("I want to video call my grandchildren") not feature-based.
- **KPIs**: Task completion rate, time-to-first-success, return usage at 7/30 days, scam quiz scores, NPS, caregiver satisfaction.
- **Adoption enablers**: Library/senior-center kiosk mode; phone-in voice agent for low-literacy users.

---

### 4. Production & Operations Requirements

#### Key Insights

1. **Trust and privacy are product-critical, not compliance-only.** 60% of 50+ believe tech is not designed for their age; privacy is now the top adoption barrier (AARP, 2025). Transparent data use, no training on user conversations without consent, and clear "not a bank/government" disclaimers are required.

2. **Security posture must assume high-value adversaries.** Seniors are disproportionately targeted by tech-support scams ($1.04B losses, 60+, 2025 IC3), AI-enabled voice clones ($352M elder AI-fraud losses), and recovery scams ($540M). Safety Coach agent needs real-time scam pattern detection with conservative escalation.

3. **Deployment for MVP**: Single-region cloud (US), HTTPS, SOC2-ready logging, PII minimization, COPPA not applicable but HIPAA may apply if telehealth tutorials link to PHI — avoid storing health data in MVP.

4. **Monitoring**: Track agent hallucination rate (human review sample), escalation rate, session abandonment step, accessibility errors, and fraud-incident reports.

5. **Operational model**: Hybrid AI + contracted human tech guides for escalation tier; partner with existing senior support networks rather than building 24/7 call center at launch.

#### Data Points

| Risk | 2025 U.S. Impact (60+) |
|------|------------------------|
| Total fraud losses | $7.75B |
| Tech/customer support scams | $1.04B |
| AI-related fraud (all ages; 39% elder share) | $352M elder portion |
| Average loss per complaint | $38,501 |

#### Source Citations

- FBI IC3 2025 Annual Report and Elder Fraud Section
- AARP analysis of FBI/FTC 2025 fraud data
- Stolen Trust 2026 study (HCSK)
- OATS Digital Wellness / privacy barriers research (2025)

#### Implications

- **Compliance baseline**: WCAG 2.1 AA, CCPA, eventual SOC 2 Type II for enterprise sales.
- **Secrets**: API keys via env vars only; no PII in logs.
- **Rollback**: Feature-flag agent prompts and RAG corpora; version learner-state schema.
- **Cost structure (MVP estimate)**: 2–3 FTE (eng + gerontology/UX advisor) × 3–4 months; $2–5K/mo infra at pilot scale; LLM costs dominant variable.

---

### 5. Innovation & Differentiation Analysis

#### Key Insights

1. **Agentic differentiation vs. class-based incumbents.** GetSetUp and Senior Planet scale via live classes and peer instructors; an agentic platform offers on-demand, adaptive, private practice at 2 a.m. when anxiety strikes — a moment classes do not serve.

2. **Agentic differentiation vs. single-chatbot competitors.** TechMaid and generic ChatGPT provide Q&A; multi-agent systems separate **pedagogy**, **safety**, and **progress tracking**, reducing conflicting advice and enabling structured skill pathways.

3. **Emerging tech enablers.** Voice AI quality improvements, on-device speech recognition, and AI scam-detection patterns (IC3 trend data) align with 2025–2026 product timing. AARP shows AI usage among 50+ doubled to ~30% — reduced stigma for AI tutors.

4. **Partnership opportunities.** OATS/Senior Planet (content licensing), AARP (trust brand), AT&T/Verizon digital wellness programs, Medicare Advantage plans, public libraries, and senior living operators (TechMentor already targets this segment).

5. **Monetization strategies.** (a) B2C freemium/subscription, (b) B2B2C per-member-per-month for health plans, (c) white-label for senior living, (d) grant/foundation funding for underserved seniors (OATS model), (e) affiliate referrals to legitimate security tools (transparent, optional).

#### Data Points

| Competitor | Model | AI Depth | Gap |
|------------|-------|----------|-----|
| Senior Planet (OATS) | Free classes, 400+ partner sites | Limited AI | Not on-demand personalized agent |
| GetSetUp | Live + on-demand + Helen AI | Single assistant | Not multi-agent tutoring path |
| TechMaid | Web chat + human callback | Single chatbot | No structured curriculum/progress |
| TechMentor | iOS tutorials + screen-share AI | Single tutor | Apple-only; limited safety coaching |
| OLAI | Task companion, UK-focused | Guided tasks | Limited US presence; hub-first |

#### Source Citations

- TechMaid.ai (2025)
- TechMentor Companion (2025)
- OLAI (2025)
- GetSetUp 2025 Active Aging Report
- OATS / Senior Planet (2025)
- AARP AI adoption trends (2025)

#### Implications

- **UVP**: "Your personal team of digital coaches — one teaches, one protects, one remembers what you've learned."
- **Moat**: Curated RAG corpus + learner progression data + institutional partnerships + accessibility-certified UX.
- **IP**: Likely trade secret and content library, not patents; monitor tutoring-agent patents but landscape is crowded with prior art.
- **Long-term**: Expand to smart-home setup, telehealth navigation, Medicare plan literacy (GetSetUp identified 71% research plans but only 31% confident).

---

### 6. Low-Cost Delivery Model & Gap Analysis

*Added from stakeholder research brief on almost-zero founder cost options (Aug 2026). Purpose: identify gaps between community-assembly delivery and the custom agentic platform assumed in §2–§5.*

#### Key Insights

1. **Avoid custom software at launch to minimize founder cost.** The cheapest structure positions the founder as **organizer and quality layer** — curating experience, recruiting partners, lightly adapting content — not as operator of venue, hardware, staff, and product engineering (LeadingAge pattern).
2. **Free public curricula can replace much net-new content.** DigitalLearn (PLA), TechBoomers, Senior Planet / OATS, and similar libraries supply lesson material without building a proprietary corpus from scratch — reducing both **content cost** and **RAG authoring** scope if AI is added later.
3. **Partner-owned infrastructure eliminates capital spend.** Libraries, senior centers, and housing communities often provide **space, Wi‑Fi, and computers**; main cost becomes coordination, scheduling, and facilitator training — not SaaS infra or device procurement (ODLAN / digital equity program models).
4. **Volunteer and peer models are proven for seniors.** Senior Planet-style free 1-on-1 and volunteer-supported tutoring, drop-in workshops, and **peer-to-peer learning** (seniors teaching seniors) reduce paid-staff need and align with Frontiers in Psychology findings on older-adult learning preferences.
5. **Printed guides and repeatable scripts substitute for polished software early.** Paper handouts plus facilitator scripts can deliver step-by-step and scam-awareness content before any PWA exists — especially for No-Device and low-literacy cohorts (LeadingAge; aligns with PRD Carmen persona visual-first intent).
6. **Hybrid support is the realistic AI entry point.** One live session + free hotline, prerecorded lesson, or lightweight GPT-style assistant for between-session questions matches Senior Planet / GetSetUp patterns — **AI as supplement, not primary product**, until utilization is validated.
7. **City and state digital equity programs already list free tools.** Programs (e.g., municipal connected-learning listings) offer affordable internet, device support, and literacy resources — **plug in rather than duplicate** (Detroit digital equity / statewide inclusion listings).

#### Almost-Zero Founder Cost Model (Reference Architecture)

| Layer | Low-cost approach | Typical cost to founder |
|-------|-------------------|-------------------------|
| **Founder role** | Experience design, partner recruitment, light content curation | Time only |
| **Space** | Donated: library, senior center, housing community room | $0 |
| **Teachers** | Volunteers, interns, students, retirees, civic groups | $0– stipends |
| **Content** | DigitalLearn, TechBoomers, Senior Planet + short custom handouts | $0 |
| **Devices** | Partner-owned, donated refurbished, loaner programs | $0 |
| **Support between sessions** | Hotline, printed FAQ, optional lightweight AI chat | $0– low |
| **Custom multi-agent app** | **Deferred** until demand proven | $0 at launch |

#### Best No-Cost Launch Sequence (Stakeholder Recommended)

1. **Pilot one partner site** that already has space and interested seniors (Future Insight / community pilot pattern).
2. **Use free content libraries** for lesson plans (DigitalLearn, ODLAN resource lists).
3. **Recruit volunteers or interns** for facilitation (LeadingAge; Harvard GSE Studio on volunteer tutoring).
4. **Avoid hardware spend** — partner devices and refurbished loaners (California Aging / digital equity refurbished-device pathways).
5. **Add custom tooling only after demand is proven** — workshops attended, repeat visits, scam questions logged, waitlists (Harvard GSE; Policy Lab Rutgers workshop evaluation patterns).

#### Other Cost-Saving Delivery Options

| Option | Benefit | Tradeoff |
|--------|---------|----------|
| Drop-in workshop series | One facilitator serves many; lower scheduling overhead | Less personalized pacing than 1-on-1 AI |
| Peer-to-peer learning | Reduces paid staff; builds community trust | Quality variance; needs facilitator oversight |
| Hybrid (live + hotline / prerecorded / GPT assistant) | Extends reach between sessions | AI quality and scam-advice liability if unsupervised |
| Partner with digital equity programs | Devices, connectivity, referrals already exist | Less brand control; coordination overhead |

#### Gap Matrix: Community Model vs. Custom Agentic Platform (PRD v1.1)

| Need (from PRD / personas) | Low-cost community model | Custom agentic platform | Gap severity | Mitigation / bridge |
|------------------------------|--------------------------|-------------------------|--------------|---------------------|
| **Scam Defense as headline** | Printed scam cards, workshop drills, AARP/IC3 handouts, volunteer-led "check this message" | Safety Coach agent, 24/7 scam hub, streaks | **Medium** | Start with printed + workshop; log scam questions to justify AI later |
| **Emotional safety & patience** | Volunteer training scripts; no-timer classroom norms | Product-level pause, frustration detection, copy guardrails | **High** | Facilitator guide must encode PRD emotional-safety rules; no automated detection |
| **Three learning tracks** | Separate workshop tracks or 1-on-1 intake questionnaire | Coordinator + track-aware Tutor | **Medium** | Intake form on paper; beginner vs. partial groups |
| **No-Device user (Carmen)** | Library/housing computers + print summaries | Visual-first PWA, shared-device mode | **Low** | **Strong fit** — community model natively serves Carmen MVP |
| **24/7 on-demand help** | Not available without staff or AI | Core platform value | **High** | Hybrid GPT/hotline only; or accept office-hours-only pilot |
| **Personalized step pacing** | Depends on volunteer skill | One-step Tutor + RAG | **High** | Scripts and printed steps standardize; quality varies |
| **Progress tracking & streaks** | Paper checklist, sign-in sheet | Progress Tracker DB | **Medium** | Manual metrics for pilot; validates demand before building |
| **Caregiver visibility** | Optional paper progress share | Read-only caregiver link | **Low** | Family can attend workshop; digital link deferred |
| **Human escalation** | In-room volunteer + referral to AARP Fraud Watch / IC3 | Escalation Handler webhook | **Low** | **Strong fit** — humans primary in community model |
| **Verified content (no hallucination)** | Fixed printed + licensed curriculum | RAG-only sensitive tasks | **Low** | Free curricula are pre-verified; AI introduces risk if added early |
| **Bilingual (Carmen P2)** | Bilingual volunteers or partner orgs | i18n + agent localization | **Medium** | Partner with Spanish-language community org before software |
| **Accessibility (WCAG)** | Large-print handouts, room setup | WCAG 2.1 AA PWA | **Medium** | Print and venue accessibility cheaper; digital a11y deferred |
| **Scale without linear staff cost** | Does not scale — volunteer constrained | LLM marginal cost | **High** | Community model first; software if waitlists grow |
| **Founder cash outlay** | ~$0–5K (printing, snacks, liability insurance) | $150–250K MVP engineering | **Critical** | **Primary strategic fork** |
| **Control & polish** | Low control; slower iteration | Full product control | **Medium** | Acceptable tradeoff for demand testing (Policy Lab Rutgers) |

#### Practical Tradeoffs (Stakeholder Guidance)

- The **cheapest version** will be slower to control and less polished — usually the **right tradeoff** to test demand before capital spend.
- **Main anti-pattern**: Building custom software or paying for a dedicated venue **before** knowing which support model seniors actually use (workshop vs. 1-on-1 vs. scam-only vs. take-home print).
- **Alignment with PRD**: PRD pillars (Scam Defense First, learning tracks, emotional safety) can be delivered **non-digitally first**; custom app is an **accelerator**, not a prerequisite for pilot validation.

#### Implications

- **Revise Go/No-Go**: Add **founder budget constraint** as decision gate — "Conditional Go" on custom platform until community pilot metrics met.
- **Content strategy overlap**: RAG corpus for future AI should **index free curricula** (DigitalLearn, Senior Planet, TechBoomers) — not duplicate authoring.
- **Carmen persona**: Public housing + library pilot is **better served** by low-cost model initially than by B2C subscription app.
- **Recommended staged strategy**:
  - **Phase 0 (0–90 days, ~$0)**: One-site workshop + printed scam guides + volunteer intake by track.
  - **Phase 1 (optional, low cost)**: Lightweight between-session assistant (guardrailed FAQ / scam check) using existing LLM API — **not** full five-agent crew.
  - **Phase 2 (if validated)**: Full agentic platform per PRD v1.1 with partner distribution (library/housing white-label).

#### Data Points

| Factor | Low-cost model | Custom platform (prior MRD) |
|--------|----------------|----------------------------|
| Founder MVP cash | ~$0–5K | $150–250K |
| Time to first senior served | Weeks (partner site) | 3–4 months engineering |
| Content sourcing | Free public libraries | Build/license 50+ RAG guides |
| Primary moat | Relationships + trust | Software + progression data |
| Demand validation | Sign-ins, repeat visits, waitlist | Beta activation, retention KPIs |

#### Source Citations (Low-Cost Model)

- Future Insight — community pilot / partner-site sequencing (stakeholder brief, 2026)
- Senior Planet / OATS — free classes, volunteer-supported tutoring, hybrid program models — https://seniorplanet.org/about
- ODLAN (Online Digital Literacy Access Network) — partner venue and resource models — https://resources.odlan.org/
- Harvard GSE Studio — volunteer tutoring and older-adult learning practice — https://studio.gse.harvard.edu/
- LeadingAge — senior services delivery and low-capital program design (stakeholder brief, 2026)
- California Department of Aging — refurbished device and digital equity pathways — https://aging.ca.gov/
- Rutgers Policy Lab — workshop series evaluation and scheduling efficiency (stakeholder brief, 2026)
- Frontiers in Psychology — peer-to-peer and older-adult learning (stakeholder brief, 2026)
- City of Detroit / municipal digital equity program listings — plug-in to existing literacy tools (stakeholder brief, 2026)
- DigitalLearn.org (PLA) — free curriculum backbone — https://www.digitallearn.org/
- TechBoomers — free senior-friendly tutorials — https://techboomers.com/

---

## Critical Decision Points

### Go/No-Go Factors

| Factor | Status | Notes |
|--------|--------|-------|
| Market demand | **Go** | Demographic + fraud + confidence gap validated |
| Technical feasibility | **Go** | Multi-agent ITS patterns proven; crewai suitable for MVP |
| Competitive white space | **Conditional Go** | Crowded at edges; differentiation requires execution on UX + safety + progress |
| Unit economics | **Conditional Go** | LLM costs require B2B2C or premium pricing — **or** defer software and run community model |
| Regulatory/trust | **Conditional Go** | Must nail privacy and scam-coaching accuracy |
| **Founder budget / delivery model** | **Conditional Go — unresolved** | §6 gap analysis: custom platform ($150–250K) vs. almost-zero community pilot ($0–5K) — **stakeholder must choose lead track** |
| **Demand validation before build** | **Go (recommended)** | Best no-cost sequence: partner pilot → free content → volunteers → tooling only if proven |

### Delivery Model Fork (New — Resolve Before Build)

| Path | When to choose | Upfront cost | Primary gap vs. PRD v1.1 |
|------|----------------|--------------|---------------------------|
| **A — Community assembly (Phase 0)** | Founder capital constrained; Carmen/library/housing focus; test workshops first | ~$0–5K | No 24/7 AI, weak automated progress, volunteer-dependent emotional safety |
| **B — Hybrid (Phase 0 + lightweight AI)** | Pilot running; need between-session scam checks | ~$1–10K/mo LLM | Partial PRD; not full five-agent crew |
| **C — Full agentic platform** | Waitlists, repeat engagement, and partner demand proven; funding available | $150–250K+ | None if executed per PRD — **premature if Path A not validated** |

### Technical Architecture Choices

- **Runtime (MVP)**: `crewai` — sequential tutoring flows, YAML agent config, AAMAD-aligned
- **Runtime (Phase 2)**: `claude-agent-sdk` if voice/screen-sharing becomes core
- **Orchestration**: Coordinator agent + specialist agents; centralized learner-state document (IntelliCode pattern)
- **Content**: RAG over licensed/owned senior-friendly tutorials; IC3/AARP scam patterns for Safety Coach
- **Channels**: Web-first PWA (no app store friction); optional iOS wrapper later

### Market Positioning

- **Primary**: U.S. adults 65–79, English, home users seeking independence from family IT support
- **Secondary**: Family caregivers (gift subscriptions), senior living activities directors
- **Enterprise**: Medicare Advantage and Area Agencies on Aging pilots (12–18 month sales cycle)

### Resource Requirements

| Phase | Team | Timeline | Budget (indicative) |
|-------|------|----------|---------------------|
| **Phase 0 — Community pilot** | Founder + 1 partner site + 3–5 volunteers | 4–8 weeks | **$0–5K** (print, insurance, supplies) |
| **Phase 1 — Hybrid AI supplement** | Founder + part-time dev or no-code LLM wrapper | +4–8 weeks | **$1–10K/mo** LLM + minimal eng |
| MVP (full platform) | 2 engineers, 1 UX/gerontology advisor, PM | 3–4 months | $150–250K |
| Pilot (platform + partners) | +1 partnerships/sales, +human escalation contractors | +3 months | $100–150K |
| Scale | +content, +customer success, compliance | 6–12 months | $500K+ |

*See §6 for gap between Phase 0 and full MVP.*

---

## Risk Assessment Matrix

### High Risk

| Risk | Mitigation |
|------|------------|
| Agent gives harmful/wrong instructions (banking, security settings) | RAG-only for sensitive tasks; confidence thresholds; human escalation; disclaimer UX |
| Elder fraud via impersonation of the product | Strong auth, caller verification education, official comms channel |
| LLM cost exceeds revenue at scale | Session caps, model tiering, institutional pricing |
| Low trust / low adoption despite demand | Nonprofit advisory board, AARP-style plain language, free tier, library partnerships |
| **Building software before demand proof** | **Run Phase 0 community pilot first** (§6); set go/no-go metrics (repeat visits, waitlist, scam questions logged) |
| **Volunteer quality variance** | Printed scripts, facilitator training aligned with PRD emotional-safety rules, peer lead + staff backup |

### Medium Risk

| Risk | Mitigation |
|------|------------|
| Competitor incumbents add multi-agent features | Move fast on progress tracking + safety integration; institutional contracts |
| Accessibility failures alienate core users | WCAG 2.1 AA audit; senior user testing before launch |
| Family/caregiver privacy conflicts | Granular sharing controls; senior-owned accounts |
| Enterprise sales cycle delays revenue | Parallel B2C launch |

### Low Risk

| Risk | Mitigation |
|------|------------|
| Patent blocking | Prior art abundant in ITS; focus on execution |
| Regulatory change (AI) | Monitor state/federal AI bills; minimal automated decisions on user behalf |
| Device fragmentation | Start iPhone + Android web; expand native later |

---

## Actionable Recommendations

### Immediate Next Steps (48 hours)

1. **Delivery model decision** — Choose Path A (community pilot), B (hybrid), or C (full platform) per §6 Delivery Model Fork; **default recommendation: Path A first** unless funding committed.
2. **If Path A**: Identify one library, senior center, or housing partner with space, Wi‑Fi, and ≥10 interested seniors.
3. **Stakeholder alignment** — Confirm primary persona (65–79 vs. 80+), geography (U.S.-only MVP), and whether PRD v1.1 should be reframed as Phase 2 after pilot.
4. **Content strategy** — Map DigitalLearn, TechBoomers, and Senior Planet modules to PRD learning tracks and scam-defense headline (reduce future RAG build).
5. **Competitive deep-dive** — Hands-on evaluation of TechMaid, TechMentor, GetSetUp Helen, and Senior Planet onboarding flows.
6. **Proceed to PRD alignment** — Reconcile PRD v1.1 with chosen delivery path; update Assumptions if Phase 0 leads.

### Short-term Priorities (30 days)

**If Phase 0 (community pilot) leads:**

1. Recruit 3–5 volunteer facilitators; provide emotional-safety and scam-workshop scripts.
2. Print scam-defense handouts and track-specific intake forms (Beginner / Partial / No-Device).
3. Run 2–4 drop-in workshops; log attendance, repeats, and scam questions.
4. Document partner MOU (space, devices, liability).
5. Set metrics threshold to authorize Phase 1/2 software (e.g., ≥40% repeat attendance, ≥20 scam checks requested).

**If full platform path confirmed:**

1. Define MVP agent roster and learner-state schema (Coordinator, Tutor, Safety Coach, Progress Tracker).
2. Conduct 8–12 senior user interviews (mix of 65–74 and 75+) on goals, fears, and preferred interaction modes.
3. Wireframe accessibility-first PWA (large text, voice, one-step-at-a-time flow).
4. Build RAG corpus pilot from **free curricula first** — 50 tasks (video call, email, banking view-only, scam recognition).
5. Establish human escalation SLA and partner (even 1 part-time guide).

### Long-term Strategy (6–12 months)

1. **If Phase 0 succeeded**: Launch Phase 1 lightweight between-session scam assistant OR Phase 2 full platform with library/housing branding.
2. Launch B2C beta in one metro + virtual nationwide (platform path only).
3. Pursue senior living, **public housing**, and library pilots (10 sites).
4. Add voice-first phone channel and caregiver dashboard (platform path).
5. Pursue Medicare Advantage or state aging department pilot.
6. Localize for Spanish (U.S.) — **volunteer/partner path may precede software i18n**.
7. Publish outcomes data (workshop attendance + digital metrics) for enterprise and grant funding.

---

## Research Quality Notes

- **Sources cited**: 22+ authoritative references (see below) plus §6 low-cost model sources.
- **Recency**: Majority from 2024–2026; demographic baselines from UN WPP 2024.
- **Conflicts**: Market size estimates vary widely ($11B senior tech services vs $286B AgeTech vs $15B digital inclusion training) due to segment definitions — financial projections should use the narrowest relevant segment (senior tech services + digital inclusion training) for bottom-up modeling.
- **Conflicts (delivery model)**: §2–§5 optimize for **capitalized SaaS**; §6 stakeholder brief optimizes for **$0 founder cost** — both valid; **PRD v1.1 currently assumes SaaS path without Phase 0**.
- **Gaps identified (§6)**:
  - **Strategic**: No stakeholder decision on Path A vs. C; PRD/MRD misalignment on launch sequence.
  - **Product**: 24/7 personalized pacing and automated emotional safety **not achievable** in pure community model without hybrid AI.
  - **Content**: Free curricula mapping to three learning tracks and scam headline **not yet done**.
  - **Carmen**: Community model **strong fit**; bilingual still deferred in both paths.
  - **Metrics**: Phase 0 success thresholds for authorizing software spend **undefined**.
  - **Legal**: Volunteer liability, insurance, and scam-advice disclaimers for workshops **not researched**.
  - Willingness-to-pay primary research not yet conducted; enterprise contract values inferred from adjacent edtech/health engagement benchmarks.

---

## Sources

1. UN DESA Policy Brief No. 186: Gender Matters in an Ageing World (Feb 2026) — https://desapublications.un.org/policy-briefs/un-desa-policy-brief-no-186-gender-matters-ageing-world-case-gender-responsive-policies
2. UN World Population Prospects 2024 Key Messages — https://population.un.org/wpp/assets/Files/WPP2024_Key-Messages.pdf
3. AARP, *2024 Tech Trends and Adults 50+* — https://www.aarp.org/content/dam/aarp/research/topics/technology/internet-media-devices/2024-tech-trends-adults-50-plus.doi.10.26419-2Fres.00772.001.pdf
4. AARP, *2025 Tech Trends and Adults 50-Plus* — https://www.aarp.org/content/dam/aarp/research/topics/technology/internet-media-devices/2025-technology-trends-older-adults.doi.10.26419-2fres.00891.001.pdf
5. AARP, "Tech Use and Adoption Growing Among Adults Age 50-Plus" (2026 summary) — https://www.aarp.org/pri/topics/technology/internet-media-devices/2026-technology-trends-older-adults/
6. DataReportal, "Digital 2025: Senior Surfers" — https://datareportal.com/reports/digital-2025-sub-section-senior-surfers
7. QY Research, Global Senior Tech Service Market Outlook to 2032 — https://www.qyresearch.com/reports/6112228/senior-tech-service
8. FutureDataStats, Digital Inclusion Training Market — https://www.futuredatastats.com/digital-inclusion-training-market
9. SilverEconomy.com, AgeTech Market Report 2026 — https://silvereconomy.com/agetech-market-report-2026/
10. GetSetUp, 2025 Active Aging Report — https://www.getsetup.com/post/getsetup-releases-its-2025-active-aging-report
11. McKnight's Senior Living, "Improving digital literacy in older adults is now a health imperative" (Oct 2025) — https://www.mcknightsseniorliving.com/news/improving-digital-literacy-in-older-adults-is-now-a-health-imperative-report/
12. FBI IC3, 2025 Annual Report — https://www.ic3.gov/AnnualReport
13. AARP, "New FBI Report: $20.9 Billion Lost to Internet Crimes in 2025" — https://www.aarp.org/money/scams-fraud/fbi-ftc-report-2025-losses/
14. HousingWire, "FBI: Seniors lost $7.75B to cybercrime in 2025" — https://www.housingwire.com/articles/fbi-seniors-cybercrime-2025/
15. Stolen Trust 2026: Protecting Seniors From Online Scams — https://seniors.hcsk.org/special-study-2026/read/
16. Senior Planet / OATS — https://seniorplanet.org/about
17. OATS, AT&T Connected Learning expansion (Nov 2025) — https://oats.org/press-release-att-and-oats-from-aarp-expand-work-helping-older-adults-with-technology-skills-and-education/
18. OATS, Digital Wellness case study — https://oats.org/client-projects/digital-wellness/
19. TechMaid — https://techmaid.ai/
20. TechMentor Companion — https://techmentorapp.com/
21. OLAI — https://olaiapp.com/
22. Zenodo, Senior Technology Adoption Survey Data 2026 — https://doi.org/10.5281/zenodo.19314976
23. arXiv, ITAS: Multi-Agent Architecture for LLM-Based Intelligent Tutoring — https://doi.org/10.48550/arxiv.2604.24808
24. arXiv, IntelliCode: Multi-Agent LLM Tutoring with Centralized Learner Modeling — https://arxiv.org/html/2512.18669v1
25. ScienceDirect, AIA-PAL: AI Agents for Personalized Adaptive Learning — https://www.sciencedirect.com/science/article/pii/S187705092502229X
26. MDPI Applied Sciences, ELA Tutor: Adaptive Multi-Agent ITS — https://www.mdpi.com/2076-3417/16/3/1323
27. W3C WAI, Older Users and Web Accessibility — https://www.w3.org/WAI/older-users/
28. W3C, WCAG 2.1 — https://www.w3.org/TR/WCAG21/
29. ACM Transactions on Accessible Computing, "Accessible Web Design for Older Adults" — https://dl.acm.org/doi/10.1145/3763243
30. DigitalLearn.org (Public Library Association) — https://www.digitallearn.org/
31. TechBoomers — https://techboomers.com/
32. ODLAN, Online Digital Literacy Access Network — https://resources.odlan.org/
33. Harvard GSE Studio — https://studio.gse.harvard.edu/
34. California Department of Aging — https://aging.ca.gov/
35. Stakeholder brief: Low-cost / almost-zero founder cost model (Aug 2026) — Future Insight, LeadingAge, Rutgers Policy Lab, Frontiers, Detroit digital equity patterns (internal)

---

## Assumptions

- Research focuses on **English-language, U.S.-centric MVP** unless stakeholder specifies otherwise; global data included for long-term sizing only.
- No `aamad.config.yml` was present; runtime default `crewai` applied per adapter registry rules **for Phase 2 software only** — not required for Phase 0 community pilot.
- Market size figures from syndicated reports (QY Research, FutureDataStats, SilverEconomy) are treated as directional; independent verification via bottom-up TAM/SAM modeling deferred to PRD/financial modeling.
- Willingness-to-pay inferred from TechMentor ($9.99–$19.99/mo) and TechMaid freemium/paid tiers; **may be N/A if nonprofit/community model leads**.
- Product scope assumes **digital literacy and safety coaching**, not medical advice, financial product sales, or direct fraud remediation (escalation to humans/authorities only).
- "Agentic" interpreted as **multi-agent orchestration with specialized roles**, not autonomous action on user devices without explicit consent — **applies to software path only**.
- **§6 low-cost brief** treated as stakeholder-authoritative for founder budget constraints; URLs for DigitalLearn, Senior Planet, ODLAN, TechBoomers verified; other citations (Future Insight, LeadingAge, Policy Lab) recorded as stakeholder brief pending primary source fetch.
- **PRD v1.1** was authored assuming custom platform; **alignment with Phase 0 community pilot not yet updated in PRD**.

---

## Open Questions

1. **Delivery model (critical)**: Path A community pilot, Path B hybrid AI, or Path C full platform first?
2. **Phase 0 go metrics**: What repeat attendance / waitlist / scam-question volume triggers software investment?
3. **Primary buyer**: Consumer, senior living, housing authority, library, health plan — which channel leads GTM?
4. **Device scope**: Web/PWA only for MVP, or Phase 0 print-only with no app?
5. **Human escalation**: Volunteer-only, partner hotline (AARP), or build Escalation Handler webhook?
6. **Content licensing**: Index DigitalLearn/TechBoomers/Senior Planet in RAG vs. workshop print packs only?
7. **Language**: English-only MVP or Spanish from day one (volunteer bilingual vs. software i18n)?
8. **Screen sharing**: Phase 2 or never if community model persists?
9. **Privacy model**: Caregiver progress sharing defaults (unchanged from prior MRD)?
10. **Nonprofit vs. for-profit**: Does mission alignment require B-Corp, fiscal sponsor, or housing/library MOU?
11. **Regulatory**: Workshop scam advice liability insurance and disclaimers?
12. **Volunteer model**: Peer-to-peer only or trained student/intern facilitators?
13. **Resolved runtime confirmation**: Is `crewai` build deferred until post-pilot, or proceeding in parallel?
14. **PRD update**: Should PRD v1.1 be split into Phase 0 (community) and Phase 2 (platform) documents?

---

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:12:00Z |
| Persona id | `product-mgr` |
| Action | `create-mrd` (revision — §6 low-cost model & gap analysis) |
| Prior audit | 2026-07-30T22:15:00Z |
| Resolved runtime | `crewai` (default; deferred if Phase 0 community pilot leads) |
| Model | Composer |
| Inputs | Prior MRD; stakeholder low-cost options brief (Aug 2026) |
| Prompt Trace | Omitted — MRD gap analysis revision; sources cited inline |
