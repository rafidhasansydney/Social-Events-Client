# Bandhan

A community events platform for people who want to lend a hand close to home.

Live site: deployment pending.

বাংলায় ব্যবহার ও চালানোর নির্দেশনা: [Bandhan ব্যবহার করার নিয়ম](USAGE.bn.md).

## Features

- Community-focused homepage with responsive photo galleries and event category filters.
- Email registration and login with password validation and success notifications.
- Google Login through BetterAuth, verified with a real Google account on localhost.
- Persistent sessions, profile photos, account menus and logout.
- Protected account page backed by a JWT-verified API.
- Same-origin API proxy for browser requests.
- Protected Create Event form with field validation, a live image preview and future date checks.
- Database-backed Upcoming Events page with chronological cards and gathering descriptions.

The six homepage events are currently preview data. Database-backed homepage events, event detail pages, joining and event management are planned for the next phases.

## Creating an event

Log in and choose Create Event from the account menu, or open `/create-event`. Add a title, description, cause, public image URL, meeting location and a future date and time. Dates are entered in the device's local time and sent to the server as UTC. The server takes organizer identity from the verified session.

Publishing shows a success toast and opens `/upcoming-events`, where saved future events appear in date order. This public page includes loading, empty and retry states. Image failures have a visual fallback. Form errors preserve entered information.

Local browser verification covered required fields, past-date rejection, image preview, successful publication, the redirect, persisted events after reload and responsive layouts at 390px and 1440px. The temporary verification event was removed afterward. Server checks cover ownership spoofing, JWT/session enforcement, validation, persistence and upcoming-event filtering in an isolated database.

## Local setup

Run `npm ci`. Copy `.env.example` to `.env.local` and point `API_URL` to the Express server origin. For local development the server runs at `http://localhost:5000`.

Start the backend, then run `npm run dev` in this folder. Open `http://localhost:3000`.

Use `npm run lint` and `npm run build` to validate the client. Use `npm start` after building to run the production bundle locally.

## Google Login

The browser calls `/api/auth/*` through the Next.js API proxy. Google credentials and the BetterAuth secret belong only in the server environment.

Local authorized JavaScript origin: `http://localhost:3000`.

Local authorized redirect URI: `http://localhost:5000/api/auth/callback/google`.

While the Google app is in Testing mode, add the Google accounts used for testing under Google Auth Platform > Audience. Local Google sign-in, the callback and the protected account page have been verified with a real account. Repeat this check on the deployed site.

## Deployment

Set `API_URL` in the frontend hosting environment to the deployed backend origin. For separate frontend and backend domains, use the frontend API proxy as the public auth origin and add its `/api/auth/callback/google` URL to Google OAuth. Align server `CLIENT_URL`, `BETTER_AUTH_URL`, trusted origins, HTTPS cookies and proxy client IP handling, then test Google Login and private-route reloads on the live site.

The final live URL and additional completed features will be added before submission.
