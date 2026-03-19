# AI Digital Twin

A web funnel for an **AI Digital Twin** experience — a personalized wellness companion with 24/7 support and guidance.

---

## Setup

### Prerequisites

- **Node.js** 20+ (recommended)
- **PostgreSQL** database (use [Neon](https://neon.tech) free tier)

### 1. Clone and install

```bash
git clone <repo-url>
cd "AI Digital Twin"
npm install
```

### 2. Database

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project → copy the **Connection string**
3. Create `.env` in the project root:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"
```

4. Run migrations:

```bash
npx prisma migrate dev
```

### 3. Optional environment variables

Add to `.env` as needed:

| Variable         | Required | Description                                                    |
| ---------------- | -------- | -------------------------------------------------------------- |
| `DATABASE_URL`   | Yes      | PostgreSQL connection string                                   |
| `OPENAI_API_KEY` | No       | Enables LLM-generated analysis (fallback: deterministic rules) |
| `OPENAI_API_URL` | No       | OpenAI API base URL (default: `https://api.openai.com/v1`)     |
| `OPENAI_MODEL`   | No       | Default: `gpt-4o-mini`                                         |
| `DEBUG_EVENTS`   | No       | Set to `1` to enable `/debug/events` in production             |

### 4. Run locally

```bash
npm run dev
```

### 5. Code formatting (Prettier + Husky)

- `npm run format` — format all files
- `npm run format:check` — check formatting without writing
- Pre-commit hook runs Prettier on staged files via lint-staged

Open [http://localhost:3000](http://localhost:3000) — you’ll be redirected to `/quiz`.

---

## Project Overview

### Funnel flow

| Step | Route      | Description                                                  |
| ---- | ---------- | ------------------------------------------------------------ |
| 1    | `/`        | Landing page with CTA                                        |
| 2    | `/quiz`    | Personality quiz (personality, therapy style, goals, stress) |
| 3    | `/email`   | Email capture                                                |
| 4    | `/chat`    | Chat with intro message                                      |
| 5    | —          | Structured analysis popup after 5 user messages              |
| 6    | `/paywall` | Paywall screen (no payments implemented)                     |

### Features

- **Quiz** — Multi-step personality quiz with progress indicator
- **Email capture** — Collects email for user identification
- **Chat** — AI-style chat with intro message
- **Analysis** — Structured popup (LLM or deterministic fallback)
- **Event tracking** — All funnel events stored in DB
- **Debug UI** — `/debug/events` to inspect events (requires `DEBUG_EVENTS=1` in prod)
- **Theme toggle** — Light/dark mode support

---

## Code Structure

```
app/
├── api/                    # API routes
│   ├── analysis/           # LLM/deterministic analysis
│   ├── chat/message/       # Chat message handler
│   ├── email/              # Email submission
│   ├── events/             # Event tracking
│   └── quiz/               # Quiz submission
│
├── chat/                   # Chat page + components
│   ├── components/         # ChatInput, MessageList, AnalysisModal, etc.
│   ├── page.tsx
│   ├── useChat.ts
│   └── utils.ts
│
├── components/             # Shared UI
│   ├── ActionBar.tsx
│   ├── FunnelStepIndicator.tsx
│   ├── PageTitle.tsx
│   └── ThemeToggle.tsx
│
├── customizing/            # Post-quiz customization step
├── debug/events/           # Debug events table (prod: DEBUG_EVENTS=1)
├── email/                  # Email capture page
├── lib/                    # Shared utilities
│   ├── api/                # API client + types
│   ├── utils/              # validation, id, etc.
│   ├── analysis.ts         # Analysis logic
│   ├── prisma.ts           # Prisma client (PostgreSQL)
│   ├── session.ts          # Session/user ID
│   ├── track.ts            # Event tracking
│   └── toast.tsx
│
├── paywall/                # Paywall page
├── providers.tsx           # React Query + providers
├── quiz/                   # Quiz page + components
├── layout.tsx
├── page.tsx                # Landing
└── globals.css

prisma/
├── schema.prisma           # DB models (User, QuizResponse, ChatMessage, Event)
├── migrations/
└── prisma.config.ts

generated/                  # Prisma client (generated, do not edit)
└── prisma/
```

### Key files

| File                    | Purpose                               |
| ----------------------- | ------------------------------------- |
| `app/lib/prisma.ts`     | Prisma client with PostgreSQL adapter |
| `app/lib/track.ts`      | Event tracking helpers                |
| `app/lib/analysis.ts`   | Analysis logic (LLM + fallback)       |
| `app/lib/api/client.ts` | API client for frontend               |
| `prisma/schema.prisma`  | Database schema                       |

---

## Event Tracking

Events are stored in the `Event` table:

| Event             | When                    |
| ----------------- | ----------------------- |
| `quiz_start`      | User opens quiz         |
| `quiz_submit`     | User submits quiz       |
| `email_submitted` | User submits email      |
| `chat_opened`     | User opens chat         |
| `message_sent`    | User sends a message    |
| `analysis_shown`  | Analysis popup is shown |
| `paywall_view`    | User views paywall      |

View events at `/debug/events` (set `DEBUG_EVENTS=1` in production).

---

## Deploy (Vercel)

1. Create a PostgreSQL database at [neon.tech](https://neon.tech)
2. In Vercel → **Settings** → **Environment Variables**, add:
   - `DATABASE_URL` — Neon connection string
   - `DEBUG_EVENTS` — `1` (to enable debug page)
   - `OPENAI_API_KEY` — (optional) for LLM analysis
3. Deploy. The `vercel-build` script runs `prisma migrate deploy` before build.

---

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Prisma 7** + PostgreSQL (Neon)
- **Tailwind CSS 4**
- **TanStack Query**
- **Zod** (validation)

---

## Notes

- Payments are not implemented (paywall is UI only).
- Analysis uses LLM when `OPENAI_API_KEY` is set; otherwise deterministic rules.
