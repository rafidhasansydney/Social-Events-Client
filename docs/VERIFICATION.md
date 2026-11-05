# Bandhan review — 5 November 2026

## Results

| Check | Result | Scope |
|---|---|---|
| Client ESLint | Passed | Current source |
| Client production build | Passed | All configured routes |
| Server automated tests | 32 passed, 0 failed | Validation, JWT/session checks, routes, errors, image processing and CORS |
| Public production API checks | 9 passed | Readiness, public events, access protection, anonymous session, bad IDs and CORS |
| Live browser review | Passed for reviewed flows | Light/dark theme, search/clear filters, empty states and anonymous private-route redirect |
| Narrow-screen header | Fixed | Verified at 320px and 390px |
| Full isolated account/event workflow | Blocked on the local connection | Atlas TLS access failed before authentication |

## Bug fixed

At a 390px viewport, the signed-out header placed the brand, theme toggle, Get involved button and menu on one row. The content width grew to 407px, putting navigation outside the viewport and creating horizontal scrolling.

The desktop Get involved button is now hidden in the header at widths up to 480px. The mobile navigation and Login path remain available. After the change, the 390px viewport had a 375px document width including the browser's scrollbar allowance; the 320px viewport had a 305px document width. No horizontal page overflow was observed at either size.

The fix was pushed in commit `4b8ea0e`. A subsequent HTTPS check returned 200 and confirmed the updated 480px header rule in the live deployment's stylesheet.

## Production API checks

| Request | Expected and observed |
|---|---|
| Backend `GET /api/ready` | 200 |
| Frontend proxy `GET /api/ready` | 200 |
| Frontend `GET /api/events?limit=6` | 200, valid list with at most six events |
| Anonymous `GET /api/me` | 401 |
| Anonymous `GET /api/events/mine` | 401 |
| Anonymous `GET /api/events/joined` | 401 |
| Anonymous `GET /api/auth/get-session` | 200, no signed-in member |
| `GET /api/events/invalid-id` | 404 |
| Untrusted Origin on backend `/api/health` | 403 |

## Limits and final acceptance

The live API had no upcoming events at the time of review. Search and empty-state behaviour could be checked, but populated card ordering and joining an existing production event were not repeated in the browser. Production records were not created, edited or deleted during this review.

The server's isolated `auth:check` covers registration, login, profile/photo persistence, event creation/editing, ownership separation, joining, duplicate prevention and transactional deletion. On this review date, `db:check` resolved the Atlas hosts but TLS failed before authentication. The production readiness endpoint succeeded. This does not establish that database credentials are wrong or that the production database is unavailable.

Live Google Login was completed successfully by the project owner on 3 November. A new Google sign-in was not automated during this review.

Before submission, use a member account to reload a private page, create and edit an event, upload a photo, confirm deletion of a disposable event and join another organiser's event from a second account. Create at least six future demonstration events if all six homepage card positions should be visible.

## Evidence

The README includes actual browser screenshots stored under `docs/images/`. Homepage light/dark and Login were captured from the live site. The mobile preview was captured from the updated local production build at 390px while verifying the header fix. A later live-browser navigation timed out on this connection, so that navigation was not counted as a successful retest.
