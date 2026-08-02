# Workshop Google Form Project

This repository contains a React frontend (`frontend/`) and a simple Express demo backend (`backend/`).

## Local development

- Frontend: `cd frontend && npm install && npm run dev`
- Backend: `cd backend && npm install && node index.js`

The frontend expects the API server at `http://localhost:5000/api` by default.

## GitHub

1. Create a repository on GitHub.
2. Add it as a remote: `git remote add origin <YOUR_REPO_URL>`.
3. Push your code: `git push -u origin main`.

## Vercel deployment

To deploy the frontend on Vercel:

1. Push the repository to GitHub.
2. In Vercel, create a new project and connect the GitHub repository.
3. Set the Root Directory to `frontend`.
4. Use the build command `npm run build` and the output directory `dist`.
5. If you host the backend elsewhere, set the Vercel environment variable `VITE_API_BASE` to the backend URL (for example, `https://your-backend.vercel.app/api`).

If you want to deploy the backend as well, you can host it on a separate Node host and point the frontend to that API.
