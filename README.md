# Vihaan Glass & Interiors

A responsive React and TypeScript website with an Express API that stores project enquiries in MongoDB.

The homepage uses sample Unsplash imagery for layout preview. Replace those image URLs in `frontend/src/pages/HomePage.tsx` with Vihaan's own project photography before publishing.

## Requirements

- Node.js 20.19 or newer
- npm 10 or newer
- A local MongoDB instance or MongoDB Atlas connection string

## Setup

1. Install dependencies from the project root:

   ```sh
   npm install
   ```

2. Create `backend/.env` from `backend/.env.example` and set `MONGODB_URI` to your MongoDB connection string. The example uses a local database.

3. Start MongoDB, then run both applications from the root:

   ```sh
   npm run dev
   ```

   The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:5001`.

Run either side independently with `npm run dev --workspace frontend` or `npm run dev --workspace backend`.

## Contact API

`POST /api/forms` accepts JSON with `name`, `email`, `phone`, `service`, and `message`. The API validates the fields and saves each valid enquiry to the `FormSubmission` collection. `GET /api/health` is a simple API health check.

The frontend uses `http://localhost:5001/api` by default. To change it, set `VITE_API_URL` in `frontend/.env.local` (include the `/api` path). Set `FRONTEND_URL` in `backend/.env` to the allowed frontend origin; multiple comma-separated origins are supported.

## Production build

```sh
npm run build
npm run start --workspace backend
npm run preview --workspace frontend
```

Deploy the frontend static build from `frontend/dist` to a static host and run the backend with the production environment variables. Configure `FRONTEND_URL` to the deployed site origin and `VITE_API_URL` to the deployed API base URL before building the frontend.