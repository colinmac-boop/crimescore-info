# MEMORY.md — CrimeScore.info

## Project Genesis
- Created 2026-09-07 by Colin's directive
- crimescore.info currently has a bare landing page ("Welcome to the CrimeScore!") linking to mcp.crimescore.info
- mcp.crimescore.info is live with a working MCP connector, test console, and demo tokens
- Goal: build a full consumer/developer frontend

## MCP Status (as of 2026-09-07)
- MCP server live at mcp.crimescore.info
- Two tools: get_safety_score(zip) and get_crime_incidents(zip)
- ~41,700 US ZIP codes covered
- 60 million crimes backing the dataset
- Adjustable weighting model (tunable, not hardcoded)
- Demo token available for ZIP 21201-21231
- Bearer token auth via Authorization header

## Competitive Landscape
- **crimegrade.org** — primary competitor. A-F letter grades, ~527K-573K monthly traffic
- **neighborhoodscout.com** — ~602K-637K monthly, paywalled analytics
- **spotcrime.com** — sister site, ~633K-907K monthly, crime map + alerts
- **spotcrime.io** — sister site, agent-first API surface, MCP server planned there too

## Copy Tone (Colin, 2026-08-10)
- "Agents don't use APIs. They use tools."
- Deterministic, inference-ready, grounded, zero hallucination surface
- "No RAG pipeline. No retrieval layer. No prompt engineering."
- "Mid-reasoning, inside the agent loop"
- Maximum AI vocabulary density
