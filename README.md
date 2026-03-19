## AI Digital Twin – Funnel (Fullstack Test Task)

Fully working web funnel for an **AI Digital Twin** experience:

- **Quiz** (`/quiz`)
- **Email capture** (`/email`)
- **Chat** (`/chat`) with intro message
- **Structured analysis popup** after **5 user messages**
- **Paywall screen** (`/paywall`) (no payments)
- **Event tracking** stored in DB + **debug table** (`/debug/events`)

## Getting Started

### Prerequisites

- Node.js 20+ recommended

### Install

```bash
npm install
```

### Database (SQLite)

This project uses **Prisma + SQLite** locally.

```bash
npx prisma migrate dev
```

### Run dev server

```bash
npm run dev
```

Open `http://localhost:3000` (it redirects to `/quiz`).

## Environment variables

Create `.env` (already present for local dev) with:

- `DATABASE_URL="file:./dev.db"`
- `OPENAI_API_KEY` (optional) – enables LLM-generated structured analysis
- `OPENAI_MODEL` (optional) – defaults to `gpt-4o-mini`
- `DEBUG_EVENTS` (optional) – set to `1` to enable `/debug/events` in production deployments

## Event tracking

Events are persisted in the `Event` table. Required funnel events tracked:

- `quiz_start`
- `quiz_submit`
- `email_submitted`
- `chat_opened`
- `message_sent`
- `analysis_shown`
- `paywall_view`

See them in the debug UI at `/debug/events`.

## Analysis implementation

The analysis popup is **structured** and validated:

- **Preferred**: LLM call when `OPENAI_API_KEY` is set
- **Fallback**: deterministic rules that return the same JSON structure

## Deploy (optional)

Deploy to Vercel (optional). If deploying, set env vars in Vercel project settings.

## Notes

- This repo uses Next.js (no Vite).
- Payments are intentionally not implemented (paywall screen only).
