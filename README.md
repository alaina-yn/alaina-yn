# alaina-yn — Personal Website

Primary portfolio hub for Governance, Risk & Compliance, Controls, TPRM, Security Assurance, Audit Readiness, and AI Governance.

## Canonical deployment

- Cloudflare Pages: https://alaina-yn.pages.dev/
- GitHub: https://github.com/alaina-yn/alaina-yn
- Project workspace: https://alaina-yn-projects.pages.dev/
- LinkedIn: https://www.linkedin.com/in/alaina-yn/

## Architecture

This is deliberately build-free static HTML/CSS/JavaScript. It deploys unchanged to Cloudflare Pages, Vercel, and GitHub Pages. Project content lives in `data/projects.json`; the homepage automatically selects the three items marked `featured: true`, and `/work/` renders the complete filterable directory.

## Routine update

1. Edit `data/projects.json`.
2. Keep project IDs stable after publication because deep links use them.
3. Run the root package validator before publishing.
4. Commit to `main`. GitHub Pages can deploy through `.github/workflows/pages.yml`; Cloudflare Pages can auto-deploy when the repo is connected.
