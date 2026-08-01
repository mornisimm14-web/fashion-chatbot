# 🛍️ AI Fashion Customer Support Chatbot

A customer support chatbot built with React, TypeScript, and Express, integrated with the Google Gemini API.

The chatbot acts as a Fashion & Styling Support Agent, equipped with system guardrails and prompt-injection resilience.

Quick Start Guide for Evaluators / Reviewers

Follow these steps to set up and run the project locally.

# Step 1: Backend Setup & Running

1. From the project root, install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the project root (see `.env.example` for the template):

   ```env
   PORT=5001
   GEMINI_API_KEY=your_gemini_api_key_here
   FRONTEND_URL=http://localhost:5173
   ```

3. Start the backend dev server:

   ```
   npm run dev
   ```

   The server runs at `http://localhost:5001`. Health check: `http://localhost:5001/api/health`.

# Step 2: Frontend Setup & Running

1. In a new terminal, go to the `frontend` folder:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the Vite dev server:

   ```
   npm run dev
   ```

   Open the URL printed in the terminal (usually `http://localhost:5173`) to start chatting.

## 📁 Project Structure

```
fashion-chatbot/
├── frontend/               # React + Vite frontend application
│   ├── src/                # Chat UI (App.tsx) and styles
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.ts      # Vite configuration
├── src/
│   └── index.ts            # Express API server, routes, and Gemini SDK integration
├── .env.example             # Environment variable template
├── .gitignore
├── package.json             # Backend dependencies and scripts
├── tsconfig.json             # TypeScript compiler settings for the backend
└── README.md
```

##  Security & Guardrails

Backend Proxy Architecture: The frontend never contacts Google's API directly; the API key stays fully protected on the server.

Strict Topic Enforcement: The system prompt restricts the model strictly to fashion and styling, rejecting off-topic queries politely.

Prompt Injection Resilience: Instructions force the model to ignore persona overrides and keep system instructions hidden.

CORS Lockdown: The API strictly accepts requests coming from the designated FRONTEND_URL.

Safe Error Handling: Clients receive generic error messages; sensitive stack traces are kept exclusively in server logs.

Controlled Output (temperature: 0.3): Low temperature ensures consistent, predictable, and strictly on-policy responses.