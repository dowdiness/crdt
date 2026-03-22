# Document Persistence — Design Spec

**Date:** 2026-03-22
**Status:** Draft
**Scope:** `examples/ideal/` (frontend) + `examples/relay-server/` (Cloudflare Worker)

---

## Goal

Add document persistence so users can save work, reload the page, and share documents via URL. Two storage layers: localStorage for instant client-side restore, Durable Object SQLite for collaborative persistence across peers.

---

## Storage Architecture

### localStorage (client-side)

- **Key:** `canopy-doc-{roomId}` → **Value:** `export_all_json()` output (SyncMessage JSON string)
- Saved on every edit (debounced ~1s) and on `beforeunload`
- On page load: if localStorage has data for this room, `apply_sync_json()` before connecting to server
- Gives instant restore on reload, works offline

### Durable Object SQLite (server-side)

- **Table:** `operations(id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`
- Each `relay_on_message` writes the SyncMessage to SQLite before broadcasting to other peers
- On `relay_on_connect`, replay all stored operations to the new peer
- Documents survive all peers disconnecting and server restarts

### Sync order on page load

1. Create editor with agent ID
2. Load from localStorage → `apply_sync_json()` (instant, offline-capable)
3. Connect to server → receive any operations we missed
4. CRDT merge handles deduplication automatically — applying the same ops twice is safe (idempotent)

---

## URL Scheme

**Format:** `https://editor.example.com/#abc123`

- Hash fragment contains the room ID
- On page load: read `location.hash`
  - If empty → generate new 8-char ID (`Math.random().toString(36).slice(2, 10)`), `history.replaceState` to set hash
  - If present → join existing room
- WebSocket connects to room matching the hash

### localStorage keying

- `canopy-doc-{roomId}` — CRDT state (SyncMessage JSON)
- `canopy-agent-{roomId}` — agent ID (per-room, persistent across reloads)

### Document lifecycle

- Visit with no hash → new document, new room ID, empty editor
- Visit with hash → join existing room, load from localStorage + server
- Share the URL → collaborator joins the same room
- No document listing UI — browser history serves as the document list

---

## Implementation

### Frontend changes (`examples/ideal/web/src/`)

**main.ts:**
- Read `location.hash.slice(1)` for room ID
- If empty, generate ID and `history.replaceState('#' + id)`
- After `create_editor()`: check `localStorage.getItem('canopy-doc-' + roomId)`
  - If found: `apply_sync_json(handle, savedState)`
- Set up save: debounced (1s) `localStorage.setItem('canopy-doc-' + roomId, export_all_json(handle))` on text change
- `window.addEventListener('beforeunload', () => save())`
- Pass `roomId` to SyncClient instead of hardcoded room name

**sync.ts:**
- Accept dynamic room name parameter instead of `DEFAULT_ROOM`
- No other changes — WebSocket protocol stays the same

### Server changes (`examples/relay-server/src/index.ts`)

**Schema initialization** (in Durable Object constructor or first request):
```sql
CREATE TABLE IF NOT EXISTS operations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
)
```

**On connect (`relay_on_connect`):**
- Query all operations from SQLite: `SELECT data FROM operations ORDER BY id`
- Send each as a sync message to the new peer
- Then proceed with normal relay behavior

**On message (`relay_on_message`):**
- Insert operation into SQLite: `INSERT INTO operations (data) VALUES (?)`
- Then broadcast to other peers (existing behavior)

### No MoonBit changes

All required APIs already exist:
- `export_all_json(handle)` — full CRDT state
- `apply_sync_json(handle, json)` — merge operations
- `get_version_json(handle)` — version tracking
- `create_editor(agent_id)` — editor creation

---

## Edge Cases

### localStorage quota exceeded
- Catch `QuotaExceededError` on `setItem`, log warning, continue without local persistence
- JSON CRDT state for typical documents is small (< 1MB)

### Stale localStorage + fresh server state
- Not a problem — CRDT merge is idempotent and commutative
- Client applies localStorage state, then server sends additional operations
- Result is the union of both — no data loss, no conflicts

### Multiple tabs same document
- Each tab has its own editor instance with the same agent ID
- Both connect to the same room via WebSocket
- CRDT handles concurrent edits from same agent correctly
- localStorage writes may race — last write wins, but server has the authoritative state

### Empty document on first visit
- No hash → generate ID → empty editor → save empty state to localStorage
- First keystroke triggers save debounce

---

## Testing

- Create doc → type → reload → text preserved (localStorage)
- Create doc → copy URL → open in incognito → document appears (server persistence)
- Both peers disconnect → reconnect via URL → document restored (SQLite)
- Offline editing → reconnect → changes synced
- Large document → localStorage save/load timing

---

## Out of Scope

- Document listing / management UI
- Authentication / access control
- Document deletion / expiry / TTL
- Binary serialization / compression of CRDT state
- Conflict resolution UI (CRDT handles it automatically)
- Playwright E2E tests for ideal editor (no test infrastructure exists yet)
