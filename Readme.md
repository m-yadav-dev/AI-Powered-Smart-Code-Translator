# CodeMorph — AI-Powered Smart Code Translator

A full-stack web application that uses Google's **Gemini 2.5 Flash** model to translate, explain, analyze, and optimize code across multiple programming languages — all from a single editor interface.

[VISUAL PROOF: PROJECT WORKING SCREENSHOT]
<!-- Add the actual screenshot showing the implemented feature here. -->

---

## Problem It Solves

Developers frequently need to convert code between languages, understand unfamiliar codebases, or identify performance bottlenecks. Each of these tasks traditionally requires switching between different tools, reading documentation, or manually rewriting logic.

**CodeMorph** consolidates four distinct AI-powered code operations into one interface:

1. **Translate** code from one language to another.
2. **Explain** code in beginner-friendly plain English.
3. **Analyze** time and space complexity (Big-O notation).
4. **Optimize** code for better performance with actionable suggestions.

Every operation is logged per-user, creating a searchable history of past translations and analyses.

---

## Core Features

### Monaco Code Editor
The source code input uses **Monaco Editor** (the same editor that powers VS Code), providing syntax highlighting, IntelliSense, and multi-language support directly in the browser.

### Four AI-Powered Actions

Users select an action from the toolbar and click **Execute Action**. The backend sends a structured prompt to Gemini and returns a parsed JSON response.

| Action | What It Does | Output |
|--------|-------------|--------|
| **Translate Code** | Converts code from a source language to a target language | Translated code string |
| **Analyze Complexity** | Evaluates algorithmic complexity | Time complexity, space complexity, and explanation |
| **Explain Code** | Describes what the code does in simple terms | Plain-English explanation |
| **Optimize Code** | Rewrites code for better performance | Optimized code and improvement suggestions |

[VISUAL PROOF: CORE FEATURE]
<!-- Add an actual project screenshot demonstrating this feature here. -->

### Supported Languages

JavaScript, Python, Java, C++, and C#. Each language loads with starter boilerplate code in the editor.

### User Authentication

- **Email/Password** registration and login (passwords hashed with `bcryptjs`).
- **Google OAuth 2.0** sign-in as an alternative.
- JWT-based session management stored in browser cookies.
- Protected routes — all code operations and history require authentication.

### Translation History

Every AI operation is automatically saved to MongoDB with the input code, source/target languages, action type, and output. Users can:
- Browse paginated history.
- View individual history entries.
- Delete single entries or clear all history.

---

## How It Works

### Core User Flow

```
Sign Up / Log In  →  Write code in Monaco Editor  →  Select action (Translate / Analyze / Explain / Optimize)
      ↓                                                          ↓
  JWT issued,                                             Click "Execute Action"
  stored in cookie                                                ↓
                                                    Frontend sends POST to /api/code/*
                                                                  ↓
                                                    Backend validates with Zod, builds prompt,
                                                    sends to Gemini 2.5 Flash
                                                                  ↓
                                                    Gemini returns JSON → parsed → saved to History
                                                                  ↓
                                                    Result displayed in Output Panel
```

[VISUAL PROOF: CORE USER WORKFLOW]
<!-- Add a diagram showing the main user/application flow here. -->

---

## Core Implementation

### AI Integration — How Gemini Is Called

The backend uses the `@google/genai` SDK to communicate with Google's **Gemini 2.5 Flash** model. The key design decisions:

1. **Structured prompt templates** — Each action has a dedicated prompt function (in `constants/prompts.js`) that instructs Gemini to return **only valid JSON** in a specific schema. No conversational text, no markdown wrappers.

2. **JSON response mode** — The Gemini API is called with `responseMimeType: "application/json"`, forcing the model to return parseable JSON.

3. **Defensive parsing** — A utility (`parseGeminiResponseToJson`) strips any leftover markdown fences, locates the first `{` or `[`, and extracts the JSON substring before parsing. This guards against edge cases where the model wraps output despite instructions.

Example of a prompt template (translation):

```javascript
// server/src/constants/prompts.js
export const TRANSLATE_PROMPT = (sourceCode, sourceLanguage, targetLanguage) => `
You are an expert software engineer. Translate the following ${sourceLanguage} code into ${targetLanguage}.

RULES:
1. Provide the absolute best, most optimized code.
2. DO NOT include any conversational text, explanations, or markdown blocks outside the JSON.
3. You MUST return ONLY a valid JSON object using the exact structure below.

EXPECTED JSON FORMAT:
{
  "translatedCode": "<your_translated_code_here>"
}

CODE TO TRANSLATE:
${sourceCode}
`;
```

[VISUAL PROOF: AI CODE TRANSLATION FLOW]
<!-- Add a diagram or screenshot demonstrating the AI/code translation workflow here. -->

### Service Layer Pattern

Each AI operation follows the same three-step pipeline:

```
Controller (validates input with Zod)
    → Service (builds prompt, calls Gemini, parses response)
        → History Service (saves result to MongoDB asynchronously)
```

The history save is **fire-and-forget** — it uses `.catch()` so a failed history write does not block the API response to the user.

### Request Validation

All incoming requests are validated using **Zod** schemas before reaching any business logic. The server validates:
- Code payloads (source code, language identifiers)
- Pagination parameters (page number, limit)
- Environment variables at startup (MongoDB URI, API keys, JWT secret)

### Security Layers

| Layer | Implementation |
|-------|---------------|
| **Authentication** | JWT tokens verified via `Authorization: Bearer <token>` header |
| **Password Hashing** | `bcryptjs` with 10 salt rounds |
| **Rate Limiting** | `express-rate-limit` — 20 requests/15 min for code operations, 5 requests/15 min for auth |
| **HTTP Headers** | `helmet` with Content Security Policy |
| **CORS** | Restricted to specific allowed origins |
| **Input Validation** | Zod schema validation on all endpoints |

---

## Frontend–Backend Interaction

### State Management

The frontend uses **Zustand** (not Redux, despite `@reduxjs/toolkit` being installed) for all state management, split into three stores:

| Store | Responsibility |
|-------|---------------|
| `useAuthStore` | Login, signup, Google auth, logout, auth status checks |
| `useCodeStore` | Translation, complexity analysis, explanation, optimization results |
| `useHistoryStore` | Fetching, viewing, deleting, and clearing history entries |

### API Communication

An **Axios** instance with interceptors handles all HTTP requests:

- **Request interceptor** — Reads the JWT token from cookies and attaches it as a `Bearer` token in the `Authorization` header.
- **Response interceptor** — On `401` responses, automatically clears the token cookie (forcing re-login).
- **Timeout** — Set to 60 seconds to accommodate longer Gemini API response times for complex code.

### Routing

Client-side routing with `react-router-dom` enforces authentication:

| Route | Component | Auth Required |
|-------|-----------|:------------:|
| `/` | HomePage (Editor) | ✅ |
| `/login` | LoginPage | ❌ |
| `/signup` | SignUpPage | ❌ |
| `/history` | HistoryPage | ✅ |
| `/history/:id` | HistoryDetailPage | ✅ |

Unauthenticated users are redirected to `/login`. Authenticated users trying to access `/login` or `/signup` are redirected to `/`.

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Create account with email/password |
| POST | `/login` | Login with email/password |
| POST | `/google` | Login/register via Google OAuth |
| GET | `/check` | Check current auth status |
| GET | `/get-profile` | Get user profile (protected) |
| POST | `/logout` | Clear auth cookie (protected) |

### Code Operations (`/api/code`) — All Protected + Rate Limited

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/translate-code` | Translate code between languages |
| POST | `/analyze-complexity` | Get Big-O time/space analysis |
| POST | `/explain-code` | Get plain-English explanation |
| POST | `/optimize-code` | Get optimized code + suggestions |

### History (`/api/history`) — All Protected

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user-history` | Get paginated history |
| GET | `/history-entry/:entryId` | Get single history entry |
| DELETE | `/delete-entry/:entryId` | Delete single entry |
| DELETE | `/clear-history` | Delete all user history |

---

## Key Technologies

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, Zustand, Monaco Editor, React Router 7 |
| **Backend** | Node.js, Express 5, Mongoose 9 (MongoDB) |
| **AI** | Google Gemini 2.5 Flash via `@google/genai` SDK |
| **Auth** | JWT (`jsonwebtoken`), bcryptjs, Google OAuth 2.0 (`google-auth-library`) |
| **Validation** | Zod 4 (both client and server) |
| **Security** | Helmet, express-rate-limit, CORS |
| **Build** | Vite with React Compiler (via `babel-plugin-react-compiler`) |
| **Deployment** | Vercel-ready (client `vercel.json` with SPA rewrites) and Render for backend |

---

## High-Level Architecture

```
┌─────────────────────────────────────┐
│           Client (React)            │
│  Vite + Tailwind + Monaco Editor    │
│  Zustand stores → Axios instance    │
│         (Vercel deployment)         │
└──────────────┬──────────────────────┘
               │ HTTPS (Bearer JWT)
               ▼
┌─────────────────────────────────────┐
│         Server (Express 5)          │
│  Helmet │ CORS │ Rate Limiter       │
│  Auth Middleware (JWT verification) │
│                                     │
│  ┌───────────┐  ┌────────────────┐  │
│  │   Auth    │  │ Code Services  │  │
│  │ Controller│  │ (4 operations) │  │
│  └─────┬─────┘  └───────┬────────┘  │
│        │                │           │
│        ▼                ▼           │
│  ┌──────────┐  ┌────────────────┐   │
│  │  User    │  │ Gemini Service │   │
│  │  Model   │  │ (@google/genai)│   │
│  └────┬─────┘  └───────┬────────┘   │
│       │                │            │
│       ▼                ▼            │
│  ┌──────────┐  ┌────────────────┐   │
│  │ MongoDB  │  │ Gemini 2.5     │   │
│  │ (Users + │  │ Flash API      │   │
│  │ History) │  │ (Google Cloud)  │   │
│  └──────────┘  └────────────────┘   │
└─────────────────────────────────────┘
```

[VISUAL PROOF: SYSTEM ARCHITECTURE]
<!-- Add the actual system architecture diagram here. -->

---

## Setup & Running Locally

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** instance (local or Atlas)
- **Google Cloud** project with:
  - OAuth 2.0 Client ID and Secret
  - Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/m-yadav-dev/AI-Powered-Smart-Code-Translator.git
cd AI-Powered-Smart-Code-Translator
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `server/.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Client

```bash
cd client
npm install
```

Create a `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
GOOGLE_CLIENT_ID=your_google_client_id
```

Start the client:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

