# Bandhan

A community events platform for people who want to lend a hand close to home.

Live site: [Bandhan](https://social-events-client-cyan.vercel.app).

API readiness: [Server and database](https://social-events-server-yvf5.onrender.com/api/ready).

Repositories: [client](https://github.com/rafidhasansydney/Social-Events-Client), [server](https://github.com/rafidhasansydney/Social-Events-Server).

বাংলায় ব্যবহার ও চালানোর নির্দেশনা: [Bandhan ব্যবহার করার নিয়ম](USAGE.bn.md).

## Features

- Community-focused homepage with responsive photo galleries and event category filters.
- Email registration and login with password validation and success notifications.
- Google Login through BetterAuth, verified with a real Google account locally and on the live site.
- Persistent sessions, profile photos, account menus and logout.
- Protected account page backed by a JWT-verified API.
- Same-origin API proxy for browser requests.
- Protected Create Event form with field validation, a live image preview and future date checks.
- Database-backed Upcoming Events page with chronological cards and gathering descriptions.
- Gallery and computer photo uploads for registration, events and profiles, with optional image links.
- Editable account profile with a name, photo, area and short bio.
- Persistent light/dark themes across public pages, authentication, profiles and event management.
- Database-backed homepage showing up to six upcoming events using MongoDB `.limit(6)`.
- Public event details, working participation, duplicate-join prevention and return-to-event login.
- Event type filters, title/location search, loading skeletons and event link sharing.
- Protected Manage Events with owner-only editing, photo replacement and confirmed deletion.
- Protected Joined Events with chronological listings and All/Upcoming/Past views.
- Organiser-aware details: event owners get management controls instead of Join Event.

Homepage and Upcoming Events use saved events. Past events are excluded from public listings. Event creation, ownership, editing, deletion and participation are connected through the account menu and personal navigation. The client is deployed on Vercel and the server on Render, with MongoDB Atlas storage. Public production checks pass; a real Google sign-in reached the live account page.

## Colour themes

Use the moon or sun button in the header to switch between light and dark. Login and registration have the same control beside the return link. The site starts in light mode and saves the selected theme locally as `bandhan-theme`. It applies before hydration, survives reloads and navigation, and synchronizes between open tabs on the same origin. No account is required.

Both palettes cover cards, forms, search, menus, loading skeletons, empty states, notifications and the delete confirmation. Native inputs use the matching browser colour scheme. Photo captions retain their contrast over images. A branded missing-page screen offers links back to events and the homepage. The toggle uses the installed DaisyUI button component, scoped with a prefix to preserve the existing design. Reduced-motion preferences remain respected.

Theme verification covered desktop and 320px mobile layouts, signed-in header controls, form validation messages, confirmation cancellation, missing-page recovery, reload persistence and synchronization between tabs. Client lint and the production build pass. Runtime dependencies have no reported vulnerabilities in `npm audit --omit=dev`.

## Finding and joining an event

The homepage shows up to six upcoming events in date order. Cause filters run on the database before the six-event limit, so a category can find matching gatherings beyond the initial six. Upcoming Events shows all matching future events and supports case-insensitive literal searches by title or meeting location.

Select View Event to open `/events/[id]`. Details are public and support direct navigation and reload. Images have a fallback, missing events show a recovery link, and service errors have retry controls. Loading uses skeletons. Event times use the device's local timezone. The invitation closes when the start time passes.

Join Event requires login. Anonymous visitors go to Login with a return path to that event. Successful participation is saved for the verified user and remains visible after reloading. Repeated or simultaneous joins create only one participation record. Organisers cannot join their own events and see Manage Event and Edit details instead. Past events remain readable through their detail URL but cannot receive new joins. Copy link shares the current event address through the clipboard.

## Your events

Use the signed-in navigation or account menu to open Manage Events or Joined Events. The same personal navigation is available on Profile, Create Event, Manage Events, Joined Events and event editing.

Manage Events (`/manage-events`) shows only events created by the current member. Edit opens a protected, prefilled form at `/manage-events/[id]/edit`. The form reuses creation validation and photo uploads. Saving returns to Manage Events and refreshes saved listings. Existing dates can remain unchanged when editing a past event; changing the date requires a future date.

Delete opens a labelled confirmation dialog with keyboard focus on Keep event. Confirming deletion removes the event and its participation records together. The server checks ownership independently of the UI. Your actual event is not removed merely by opening this dialog.

Joined Events (`/joined-events`) shows the current member's participation in other organisers' events, sorted by event date. All, Upcoming and Past views are available. Details come from the current event record, so organiser edits appear here. Deleted events disappear. Legacy self-participation records are excluded from this list; organisers' events are under Manage Events.

Verification includes two-account owner isolation, self-join rejection, full event editing, validation for saved and changed dates, joined-list ordering, updated event details, atomic deletion and simultaneous join/delete requests. Browser checks cover owner controls, prefilled editing, saving back to the list, joined-list reload, access denial for another organiser's event, confirmation cancellation and layouts at 320px. Temporary workflow events and their participation were removed; the user's existing event was retained.

Browser verification covered homepage-to-detail navigation, category empty states, location search, public details without a session, the login return path, joining, persisted participation after reload, missing-event recovery and 390px mobile layouts. The isolated live check verifies six-event limits, filtering before limiting, literal search, public data projection, concurrent duplicate prevention, trusted participant identities and rejection of past-event joins. Temporary browser records were removed after testing.

## Creating an event

Log in and choose Create Event from the account menu, or open `/create-event`. Add a title, description, cause, meeting location and a future date and time. Choose a photo from your device, or expand the optional image-link field. Dates are entered in the device's local time and sent to the server as UTC. The server takes organizer identity from the verified session.

Publishing shows a success toast and opens `/upcoming-events`, where saved future events appear in date order. This public page includes loading, empty and retry states. Image failures have a visual fallback. Form errors preserve entered information.

Local browser verification covered required fields, past-date rejection, image preview, successful publication, the redirect, persisted events after reload and responsive layouts at 390px and 1440px. The temporary verification event was removed afterward. Server checks cover ownership spoofing, JWT/session enforcement, validation, persistence and upcoming-event filtering in an isolated database.

## Photos and profiles

Photo uploads accept JPG, PNG and WebP files up to 4 MB. The server decodes, resizes and converts them to WebP, strips image metadata and stores the compressed bytes in MongoDB. Uploaded photos receive a persistent image URL; users do not need to copy it. Uploads require a signed-in session and JWT. Registration uploads its selected photo after the new account has been created and signed in; if that upload fails, the account remains usable and the user can retry from their profile.

Open `/account` to edit your name, photo, area and a bio of up to 400 characters. Email is displayed as the sign-in identity. Saving updates the session and account menu; Cancel restores the saved details. Changes apply to the Bandhan profile. Server validation also applies to the underlying BetterAuth update endpoint.

Local browser checks verified device file selection, upload feedback, profile draft cancellation, saving, uploaded event photo publication and photo delivery after reload. The isolated live check verifies profile persistence, input validation, upload authentication, file limits, image decoding/resizing and public photo delivery.

## Local setup

Run `npm ci`. Copy `.env.example` to `.env.local` and point `API_URL` to the Express server origin. For local development the server runs at `http://localhost:5000`.

Start the backend, then run `npm run dev` in this folder. Open `http://localhost:3000`.

Use `npm run lint` and `npm run build` to validate the client. Use `npm start` after building to run the production bundle locally.

## Google Login

The browser calls `/api/auth/*` through the Next.js API proxy. Google credentials and the BetterAuth secret belong only in the server environment.

Local authorized JavaScript origin: `http://localhost:3000`.

Local authorized redirect URI: `http://localhost:5000/api/auth/callback/google`.

Live authorized JavaScript origin: `https://social-events-client-cyan.vercel.app`.

Live authorized redirect URI: `https://social-events-client-cyan.vercel.app/api/auth/callback/google`.

The app requests only basic identity scopes (`openid`, `email`, `profile`). Google documents an exception to the Testing-mode test-user restriction for these scopes in its [audience guidance](https://support.google.com/cloud/answer/15549945?hl=en). Reassess audience and verification requirements if additional scopes are added. Real Google sign-in and account access have been verified locally and on the live site; the live check was completed by the project owner.

## Deployment

The Vercel project imports this repository's `main` branch from root `./`, using the Next.js preset. Its `API_URL` is `https://social-events-server-yvf5.onrender.com`. Next.js proxies browser `/api/*` requests to that server.

The Render service imports the server repository's `main` branch, runs `npm ci` to install and `npm start` to serve, and uses `/api/ready` as its health check. `CLIENT_URL` and `BETTER_AUTH_URL` are both `https://social-events-client-cyan.vercel.app`. Google returns through the frontend API proxy so the session belongs to the website origin. Credentials remain in Render environment variables.

MongoDB Atlas allows the two outbound ranges currently reported for this Render service: `74.220.48.0/24` and `74.220.56.0/24`. Recheck Render's Connect > Outbound list after moving or recreating the service. Uploaded images are stored in MongoDB and do not depend on the Render filesystem. The free Render instance can sleep when idle, so the first request may take longer.

Production verification on 3 November 2026 checked database readiness through the frontend proxy, public event data, denial of anonymous profile/management/joined API requests, anonymous session handling, the configured frontend CORS origin and rejection of an untrusted origin. Browser checks covered the live homepage, public event details, direct event reload, login with an event return path and anonymous private-route redirection. The owner supplied the successful live Google account-page result. Full event create/edit/join/delete workflows were previously verified locally against Atlas, including isolated two-account checks; those writes were not repeated against production data during deployment verification.

Before submission, reload a private page while signed in and try the create, manage and joined pages on the live site with your own test events. The existing Street Cleaning event has an unavailable external image URL; its organiser can replace the photo from Manage Events > Edit.
