// Cloudflare Worker + Durable Object relay server.
// All sync logic lives in MoonBit (relay/ package).
// This file is only the ~30 lines of irreducible WebSocket event glue.

import * as relay from "@moonbit/canopy";

export interface Env {
  RELAY: DurableObjectNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const room = url.searchParams.get("room") ?? "main";
    const id = env.RELAY.idFromName(room);
    return env.RELAY.get(id).fetch(request);
  },
};

export class RelayRoom implements DurableObject {
  private roomId: string;

  constructor(state: DurableObjectState) {
    this.roomId = state.id.toString();
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const url = new URL(request.url);
    const peerId = url.searchParams.get("peer_id") ?? crypto.randomUUID();
    const pair = new WebSocketPair();
    const [client, server] = [pair[0], pair[1]];
    server.accept();

    // Pass a send callback to MoonBit — relay manages sessions + broadcast
    relay.relay_on_connect(this.roomId, peerId, (data: Uint8Array) => {
      if (server.readyState === 1) {
        server.send(data);
      }
    });

    server.addEventListener("message", (e) => {
      const data = e.data instanceof ArrayBuffer
        ? new Uint8Array(e.data)
        : new TextEncoder().encode(e.data as string);
      relay.relay_on_message(this.roomId, peerId, data);
    });

    server.addEventListener("close", () => {
      relay.relay_on_disconnect(this.roomId, peerId);
    });

    server.addEventListener("error", () => {
      relay.relay_on_disconnect(this.roomId, peerId);
    });

    return new Response(null, { status: 101, webSocket: client });
  }
}
