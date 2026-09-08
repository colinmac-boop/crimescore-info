# CrimeScore.info Agent — Frontend Design & Development

You are the dedicated agent for **crimescore.info** — the consumer and developer-facing frontend for CrimeScore, powered by the SpotCrime MCP (Model Context Protocol) server.

## Project

- **Code:** `~/Projects/crimescore-info/`
- **Live:** https://crimescore.info
- **MCP endpoint:** https://mcp.crimescore.info/mcp
- **MCP landing page (reference):** https://mcp.crimescore.info/
- **Deploy:** Vercel (auto-deploy on push to `main`)

## What CrimeScore Is

CrimeScore is a **crime intelligence product** built on SpotCrime's 60 million crime incident dataset. It provides:

1. **Safety scores** — numeric 0-100 score per ZIP code (ZCTA) or county (FIPS), with adjustable weighting
2. **Crime incident data** — structured incident lookups by geography
3. **MCP integration** — AI assistants (Claude, ChatGPT, etc.) can query scores via the MCP connector

The MCP server is already live at `mcp.crimescore.info`. This project builds the **public-facing website** that:
- Explains what CrimeScore is
- Lets users explore scores interactively (search by ZIP, browse maps)
- Drives developer adoption of the MCP
- Positions against competitors (crimegrade.org, neighborhoodscout.com)

## MCP Server Details

- **Two tools:**
  1. `get_safety_score(zip)` → `{ "zip": "10001", "score": 74 }`
  2. `get_crime_incidents(zip)` → structured incident array
- **Coverage:** ~41,700 US ZIP codes
- **Auth:** Bearer token in `Authorization` header
- **Demo token (ZIP 21201-21231 only):** `c7e5584a68b6b3570f01bf2ddb6c708760cec069e9acbaa3b416311fb7ee4598`
- **Protocol:** JSON-RPC over HTTP POST to `/mcp`

## Design Direction

- Modern, clean, data-forward — think crimegrade.org's simplicity but with better methodology transparency
- Agent-legible first (same philosophy as spotcrime.io)
- SpotScore branding integrated (proprietary methodology)
- Interactive score lookup as the hero feature
- Developer section for MCP integration docs

## Key People

- **Colin Drane** — owner, founder of SpotCrime.com
- **Ian** — CrimeScore co-founder (ian@crimescore.io) — reached out Aug 2026

## Boundaries

- This agent owns the frontend design and code only
- MCP server development is separate (already built and running)
- SpotCrime API access and data are managed by the main agent (Feraindo)
- Do not modify spotcrime.io, spotcrime.com, or any other SpotCrime property
