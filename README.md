# AI Onboarding Portal

A production-style AI-powered onboarding experience built with React, Vite, Express, MongoDB, Tailwind CSS, and Framer Motion.

## Features
- Landing page with dual onboarding paths
- Manual multi-step onboarding flow
- AI-style voice onboarding with browser speech recognition fallback
- Review and success screens
- CRUD API for users stored in MongoDB
- Responsive, modern SaaS UI

## Project Structure
- frontend/: React + Vite + Tailwind app
- backend/: Express + Mongoose API

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Backend Setup
```bash
cd backend
npm install
npm start
```

## Environment Variables
Create a .env file in the backend folder:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai-onboarding
```

## Deployment
- Frontend: Vercel
- Backend: Render

## Notes
- The voice onboarding uses the browser Speech Recognition API when no external service key is configured.
- The app is ready for future integration with OpenAI Realtime API, Vapi, ElevenLabs, or Deepgram.
