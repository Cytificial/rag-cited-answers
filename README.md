# Cited-Answer RAG — Interactive Proof

> **Every answer shows its sources.** A dependency-free retrieval system with inline citations, a visual demo, and a measured evaluation harness.

[![Node.js](https://img.shields.io/badge/Node.js-26-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen)](package.json)
[![Eval](https://img.shields.io/badge/citation%20recall-5%2F5-4ade80)](#evaluation)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**[▶ Try the interactive demo](index.html)** — a designed, browser-based UI that runs the actual retrieval algorithm and displays cited answers, ranked sources and evaluation results.

Built by **Naim Nasr** as a portfolio demonstration of production-minded AI engineering: retrieval, grounding, citation, evaluation, and honest reporting.

---

## Why this exists

High-stakes AI answers are only useful when you can trace them back to a source. This project demonstrates the full pattern in a small, reproducible package:

1. **Index** — six short documents are vectorised with TF-IDF at load time.
2. **Retrieve** — cosine similarity ranks documents against a query (top 3).
3. **Ground** — the most query-relevant sentence from the top document becomes an *extractive* answer — no invented facts.
4. **Cite** — every answer carries inline `[id]` citations to the retrieved sources.
5. **Evaluate** — five question/expected-source pairs measure citation recall.

Everything runs offline with Node.js built-ins only — no API keys, no network calls, no dependencies.

## Run it

```bash
node index.mjs                            # sample query
node index.mjs "townhouse near a school"  # your query
node index.mjs eval                       # 5-case evaluation
```

Or open [`index.html`](index.html) in any browser for the visual, interactive version — the same algorithm runs client-side.

## Evaluation

| Test question | Expected source | Retrieved | Result |
|---|---|---|---|
| 2 bedroom apartment in Dubai Marina | p1 | p1, p5, p3 | **PASS** |
| affordable studio in JVC | p6 | p6, p3, p1 | **PASS** |
| four bedroom villa in Palm Jumeirah | p2 | p2, p6, p4 | **PASS** |
| townhouse near a school | p5 | p5, p1, p2 | **PASS** |
| one bedroom apartment in Business Bay | p4 | p4, p1, p3 | **PASS** |

**Citation recall: 5/5.**

## Repository layout

```
index.html          interactive visual demo (open in a browser)
index.mjs           CLI — query and eval harness
data/docs.json      document corpus
data/evals.json     evaluation set
cv/                 role-tailored CV PDFs
README.md           this file
```

## What this demonstrates for engineering roles

- **Applied AI / RAG engineering:** retrieval, grounding, citations, evaluation.
- **AI reliability mindset:** deterministic outputs, measured accuracy, no hallucinated claims — the same discipline needed for AI security, compliance and regulated domains.
- **Clean engineering:** zero dependencies, small modules, testable harness, documented trade-offs.

## Limitations (stated honestly)

TF-IDF retrieval and extractive answers are intentionally simple — this is a portfolio demonstration of the *pattern*, not a production search engine. The natural next step is embeddings, an LLM answer layer, and a larger corpus with a full benchmark suite.

## Other work by Naim Nasr

- **Consortium Brain AI** — multi-agent collaborative reasoning with verifiable outputs
- **Speak Better With AI** — prompt understanding and generation with structured feedback
- **AI Email Threat Detection** — ML classifier with explainable security signals
- **Games for children with autism** — accessible, sensory-considerate game design
- **Healthcare AI and Incident Response AI** — applied AI for real operational workflows
- **15 professional certificates** in IT & AI from IBM, Google and Harvard
- **CVs:** [Master](cv/Naim_Nasr_CV_Master.pdf) · [AI Engineer](cv/Naim_Nasr_CV_TII-Senior-AI-Engineer.pdf) · [Applied Scientist](cv/Naim_Nasr_CV_G42-Applied-Scientist.pdf) · [Tech Lead](cv/Naim_Nasr_CV_Lucidya-AI-Tech-Lead.pdf) · [ML/FinCrime](cv/Naim_Nasr_CV_Monzo-Lead-ML-FinCrime.pdf) · [Agentic AI](cv/Naim_Nasr_CV_CDPR-Senior-Agentic-AI.pdf)
