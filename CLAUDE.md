# Saralya website — v3

Fresh redesign of the Saralya marketing site (saralya.in). Content is shared
with v1 (`C:\Users\HP\Desktop\saralya-website`, read-only reference); the
design, layout and interactions are new. v1 stays deployed until the lead
signs off on v3.

## The brief

- Anyone (CEO, CRO, CTO, compliance head, investor) must find something to
  *do* within seconds. Less text, more motion, diagrams and interaction.
- Core message: **make lending as easy as UPI** — one tap / one API call.
- Founder-approved headline: "Making Lending Saral for Bharat."

## Stack

Vite + React 19 + TypeScript, Tailwind v4 (`@theme` tokens in
`src/index.css`), `motion/react`, `lucide-react`, React Router v7.
Fonts: Bricolage Grotesque (display) + Inter (UI) + Geist Mono (labels/data).

```
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build → dist/
npx tsc -p tsconfig.app.json --noEmit
```

## Design language

Warm paper / Bharat-forward: paper `#f4eee2`, deep green `#0e5b3f`, saffron
`#e9711c`, ink `#14231c`. Grain overlay on `body::after`. Photos are masked
in an arch (`.arch`). Headlines are bold grotesk with one light saffron word
(`<em>` inside `SectionHead`/`PageHero` titles). Buttons are pills; primary
CTA is saffron.

## Layout

```
src/
  content/site.ts          copy/data copied from v1 + ROLES (persona picker)
  components/ui/           Button, Section/Container/SectionHead, Motion
  components/layout/       Nav, Footer, Cta, PageHero
  components/home/         Hero (role picker + arch photo), SanctionTicket
                           (tappable idle→checking→stamped loop), Marquee,
                           Upi (drag slider: documents→tap, days→minutes),
                           Journey (scroll-pinned six-stage loan story),
                           ForYou (persona panels driven by the hero role),
                           RunYourNumbers (calculator), Band (parallax photo)
  components/products/     ModuleVisuals — one looping visual per module,
                           shared by Journey, ForYou and /products
  pages/                   Home, Products, Technology, About, Demo, Privacy
```

Home `role` state lives in `pages/Home.tsx` and is shared by Hero and ForYou.

## Verifying UI changes

No browser tool; use headless Edge via `puppeteer-core` from the scratchpad
(`shoot.mjs`: `BASE=http://localhost:4173 node shoot.mjs` against
`npx vite preview --port 4173`). Always check zero console errors, no
horizontal overflow at 400px, and that `.demo-run` completes on /demo.
Note: Journey is sticky, so full-page clips show only its first frame.

## Open content flags

Same as v1: `PER_LOAN = 75` in RunYourNumbers is a placeholder pricing
mid-point; the demo output and all module visuals are illustrative and
labelled as such. Keep to claims in the founder-approved corrections doc.
