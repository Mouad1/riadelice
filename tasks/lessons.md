# Lessons Learned — Restaurant MVP (riadelice)

## Sessions
- 2025-01 restaurant MVP build (this session)

## Corrections / Patterns
1. **Tailwind v4, not v3**: `create-next-app@latest` installs Tailwind v4 (CSS-based config via `@theme`). A `tailwind.config.ts` is ignored. All custom tokens must live in `globals.css` under `@theme`.
2. **Next 16 conventions**: `next.config.ts` / `postcss.config.mjs` (not `.js`). Client-component pages still show `○ Static` in build output — that's prerender+hydrate, not server-executed stale markup; use `export const dynamic = "force-dynamic"` when a route reads a mutable in-memory store.
3. **`crypto.randomUUID()`**: typechecks only with DOM lib; runs fine in browser + Next server runtime.
4. **Label hygiene**: always pair `htmlFor` with matching `id` on raw `<label>`+`<select>`/`<textarea>`.
5. **Store getters**: return copies (`[...arr]`) — callers must never get internal references.
6. **Icon-only buttons** need `aria-label`; `Button` should default `type="button"`.
7. **Modal**: snapshot + restore `body.style.overflow`, focus close button, `role="dialog"` + `aria-modal` + `aria-labelledby`.
8. **cn()**: use `twMerge(clsx(...))` so consumer className wins conflicts.
9. Real data gotchas: party size 1-12 inclusive; weekend hours = both days shown separately.

## Follow-ups (future)
- [] Reservation form now writes to in-memory store — swap for real API/CMS (Sanity) when ready
- [] Add admin auth before production
- [] Mobile admin nav (sidebar hidden below `md`)
- [] Persist store (localStorage / DB) so data survives reload
