# Market Research Document (MRD)

## Research Query Structure

**Primary Focus**: Agentic digital literacy platform for seniors — a multi-agent AI system that provides personalized, patient, step-by-step technology tutoring, scam-awareness coaching, and ongoing support for adults aged 60+.

**Selected Runtime** (Build-phase recommendation): `crewai` (default; no `aamad.config.yml` present at research time)

---

## Executive Summary

The market for technology services and training aimed at older adults is large, growing, and structurally driven by demographic change rather than cyclical demand. The global population aged 60+ reached approximately 1.22 billion in 2025 and is projected to reach 2.11 billion by 2050 (UN DESA, 2024). Adjacent market segments — senior tech services (~$11.5B in 2025, QY Research), digital inclusion training (~$15B in 2025, FutureDataStats), and the broader AgeTech sector (~$286B in 2026, SilverEconomy.com) — all show high single- to low double-digit CAGR through the early 2030s. Digital literacy is increasingly framed as a health and independence imperative, not merely a convenience (GetSetUp, 2025; McKnight's Senior Living, 2025).

Despite high device ownership — roughly 9 in 10 U.S. adults 50+ own smartphones (AARP, 2025) — a persistent confidence and skills gap remains. One-third of older adults do not feel they have the digital literacy skills to fully benefit from being online, and comfort declines sharply with age (AARP, 2024). Privacy, scam fear, and age-inappropriate design are top barriers (AARP, 2025; OATS, 2025). Reported fraud losses among Americans 60+ reached $7.75 billion in 2025, a 59% year-over-year increase (FBI IC3, 2025), creating urgent demand for trustworthy, plain-language digital safety coaching alongside skills training.

Technical feasibility for an agentic tutoring system is strong. Recent multi-agent intelligent tutoring architectures (ITAS, IntelliCode, AIA-PAL, ELA Tutor) demonstrate proven patterns: centralized learner-state orchestration, specialized pedagogical/scaffolding/safety agents, RAG-grounded content, and human-in-the-loop escalation. Existing competitors (TechMaid, TechMentor Companion, OLAI, GetSetUp/Helen) validate demand for AI-assisted senior tech support but leave gaps in **true multi-agent specialization** (tutor + safety coach + progress tracker + family/caregiver liaison), **cross-device continuity**, **adaptive pacing for cognitive and motor decline**, and **B2B2C distribution** through health plans, senior living, and libraries.

**Recommended approach**: Build an MVP agentic digital literacy platform targeting U.S. adults 65+ (with expansion path to 60+ and English-first markets), differentiated by patient multi-agent tutoring, integrated scam-awareness coaching, accessibility-first UX (WCAG 2.1 AA+), and optional human escalation. Prioritize B2C subscription ($9.99–$19.99/month range, aligned with TechMentor) plus B2B2C pilots with senior living communities, Area Agencies on Aging, and Medicare Advantage plans. Use a `crewai` sequential multi-agent architecture with a coordinator agent, specialized tutor/safety/progress agents, and RAG over curated senior-friendly content.

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

## Critical Decision Points

### Go/No-Go Factors

| Factor | Status | Notes |
|--------|--------|-------|
| Market demand | **Go** | Demographic + fraud + confidence gap validated |
| Technical feasibility | **Go** | Multi-agent ITS patterns proven; crewai suitable for MVP |
| Competitive white space | **Conditional Go** | Crowded at edges; differentiation requires execution on UX + safety + progress |
| Unit economics | **Conditional Go** | LLM costs require B2B2C or premium pricing |
| Regulatory/trust | **Conditional Go** | Must nail privacy and scam-coaching accuracy |

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
| MVP | 2 engineers, 1 UX/gerontology advisor, PM | 3–4 months | $150–250K |
| Pilot | +1 partnerships/sales, +human escalation contractors | +3 months | $100–150K |
| Scale | +content, +customer success, compliance | 6–12 months | $500K+ |

---

## Risk Assessment Matrix

### High Risk

| Risk | Mitigation |
|------|------------|
| Agent gives harmful/wrong instructions (banking, security settings) | RAG-only for sensitive tasks; confidence thresholds; human escalation; disclaimer UX |
| Elder fraud via impersonation of the product | Strong auth, caller verification education, official comms channel |
| LLM cost exceeds revenue at scale | Session caps, model tiering, institutional pricing |
| Low trust / low adoption despite demand | Nonprofit advisory board, AARP-style plain language, free tier, library partnerships |

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

1. **Stakeholder alignment** — Confirm primary persona (65–79 vs 80+), geography (U.S.-only MVP), and B2C vs B2B2C priority.
2. **Competitive deep-dive** — Hands-on evaluation of TechMaid, TechMentor, GetSetUp Helen, and Senior Planet onboarding flows.
3. **Content strategy** — Identify licensable tutorial sources (OATS partnership inquiry, public-domain guides, OEM materials).
4. **Proceed to PRD** — Run `*create-prd` using this MRD as input.

### Short-term Priorities (30 days)

1. Define MVP agent roster and learner-state schema (Coordinator, Tutor, Safety Coach, Progress Tracker).
2. Conduct 8–12 senior user interviews (mix of 65–74 and 75+) on goals, fears, and preferred interaction modes.
3. Wireframe accessibility-first PWA (large text, voice, one-step-at-a-time flow).
4. Build RAG corpus pilot: 50 curated tasks (video call, email, banking view-only, scam recognition).
5. Establish human escalation SLA and partner (even 1 part-time guide).

### Long-term Strategy (6–12 months)

1. Launch B2C beta in one metro + virtual nationwide.
2. Pursue senior living and library pilot (10 sites).
3. Add voice-first phone channel and caregiver dashboard.
4. Pursue Medicare Advantage or state aging department pilot.
5. Localize for Spanish (U.S.) and evaluate EU (OLAI competitive set).
6. Publish outcomes data (task completion, confidence lift) for enterprise sales.

---

## Research Quality Notes

- **Sources cited**: 22 authoritative references (see below).
- **Recency**: Majority from 2024–2026; demographic baselines from UN WPP 2024.
- **Conflicts**: Market size estimates vary widely ($11B senior tech services vs $286B AgeTech vs $15B digital inclusion training) due to segment definitions — financial projections should use the narrowest relevant segment (senior tech services + digital inclusion training) for bottom-up modeling.
- **Gaps**: Willingness-to-pay primary research not yet conducted; enterprise contract values inferred from adjacent edtech/health engagement benchmarks.

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

---

## Assumptions

- Research focuses on **English-language, U.S.-centric MVP** unless stakeholder specifies otherwise; global data included for long-term sizing only.
- No `aamad.config.yml` was present; runtime default `crewai` applied per adapter registry rules.
- Market size figures from syndicated reports (QY Research, FutureDataStats, SilverEconomy) are treated as directional; independent verification via bottom-up TAM/SAM modeling deferred to PRD/financial modeling.
- Willingness-to-pay inferred from TechMentor ($9.99–$19.99/mo) and TechMaid freemium/paid tiers; no primary WTP survey conducted.
- Product scope assumes **digital literacy and safety coaching**, not medical advice, financial product sales, or direct fraud remediation (escalation to humans/authorities only).
- "Agentic" interpreted as **multi-agent orchestration with specialized roles**, not autonomous action on user devices without explicit consent.

---

## Open Questions

1. **Primary buyer**: Consumer (senior or caregiver gift), senior living operator, health plan, or public library — which channel leads GTM?
2. **Device scope**: Web/PWA only for MVP, or native iOS/Android required at launch?
3. **Human escalation**: Build in-house guide network, partner with existing senior tech support, or hybrid?
4. **Content licensing**: Partner with OATS/Senior Planet vs. build proprietary curriculum?
5. **Language**: English-only MVP or Spanish from day one (significant U.S. 65+ demographic)?
6. **Screen sharing**: Is real-time screen guidance a must-have (TechMentor parity) or Phase 2?
7. **Privacy model**: Can caregivers view progress by default with senior opt-in, or senior-only by default?
8. **Nonprofit vs. for-profit**: Does mission alignment require B-Corp or nonprofit partnership for trust?
9. **Regulatory**: Will any tutorials touch HIPAA-covered workflows (patient portals) requiring BAAs?
10. **Resolved runtime confirmation**: Does operator accept `crewai` default or prefer `claude-agent-sdk` for voice hooks?

---

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-07-30T22:15:00Z |
| Persona id | `product-mgr` |
| Action | `create-mrd` |
| Resolved runtime | `crewai` (default; no config override) |
| Model | Composer (research synthesis) |
| Prompt Trace | Omitted — standard market research task; sources cited inline |
