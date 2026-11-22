# RAG with source citations — offline, evaluated

A small, dependency-free retrieval-augmented answer system: every answer cites the document IDs it came from, and an eval harness measures citation recall. Built with Node.js 26 built-ins only — no API keys, no network calls, deterministic and reproducible.

## Why
Property and other high-stakes recommendations are only useful when you can trace them back to a source. This project demonstrates the pattern: retrieve relevant documents, ground the answer in the top document, cite sources inline, and evaluate the citations against an answer key.

## How it works
1. **Index** — six short documents are vectorised with TF-IDF at load time.
2. **Retrieve** — cosine similarity ranks documents against the query; top 3 are kept.
3. **Answer** — the most query-relevant sentence from the top document is returned as an extractive answer (no invented facts), followed by inline `[id]` citations.
4. **Evaluate** — five question/expected-source pairs; recall is printed as PASS/FAIL per case.

## Run
```bash
node index.mjs                         # sample query
node index.mjs "townhouse near a school"
node index.mjs eval                    # run the 5-case eval
```

## What this demonstrates for roles
- Applied AI / RAG engineering: retrieval, grounding, citation, evaluation.
- AI reliability mindset: deterministic outputs, measured accuracy, no hallucinated claims — the same discipline needed for AI security and compliance roles.
- Clean Node.js engineering: zero dependencies, small modules, testable eval harness.

## Limitations
TF-IDF retrieval and extractive answers are intentionally simple — this is a portfolio demonstration of the *pattern*, not a production search engine. Extending it to embeddings, an LLM answer layer, and a larger corpus is the natural next step.
