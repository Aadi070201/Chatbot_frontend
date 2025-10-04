"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { sender: "user" | "aadi" | "error"; text: string };

export default function Chat() {
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  async function send() {
    const query = q.trim();
    if (!query || busy) return;

    // 1) show user's question (so you can see what you asked)
    setMsg((m) => [...m, { sender: "user", text: query }]);
    setQ("");
    setBusy(true);

    // 2) add a loader bubble we will replace
    setMsg((m) => [
      ...m,
      { sender: "aadi", text: "🌌 Processing your request in the Aadi-verse..." },
    ]);

    try {
      const r = await fetch(
        (process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000") + "/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, k: 5 }),
        }
      );

      const text = await r.text();
      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch {}

      if (!r.ok) {
        const errMsg = data?.detail || data?.error || `HTTP ${r.status}`;
        // replace loader with error
        setMsg((m) => [
          ...m.slice(0, -1),
          { sender: "error", text: "❌ " + errMsg },
        ]);
        return;
      }

      const answer = data?.answer ?? "⚠️ No answer returned.";
      // replace loader with the final answer
      setMsg((m) => [...m.slice(0, -1), { sender: "aadi", text: answer }]);
    } catch (err: any) {
      // replace loader with connection error
      setMsg((m) => [
        ...m.slice(0, -1),
        {
          sender: "error",
          text: "❌ Connection error: " + (err?.message || "unknown"),
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Messages */}
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {msg.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col max-w-[80%]">
              {/* small sender label for clarity */}
              <span
                className={`mb-1 text-[11px] tracking-wide ${
                  m.sender === "user" ? "text-cyan-300 text-right" : 
                  m.sender === "aadi" ? "text-fuchsia-300" : "text-rose-300"
                }`}
              >
                {m.sender === "user" ? "You" : m.sender === "aadi" ? "Aadi" : "Error"}
              </span>

              <div
                className={[
                  "px-4 py-2 rounded-2xl whitespace-pre-wrap text-sm md:text-base leading-relaxed shadow",
                  m.sender === "user"
                    ? "bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white self-end"
                    : m.sender === "aadi"
                    ? "bg-slate-800/80 border border-slate-700 text-slate-100 self-start"
                    : "bg-[#3b0d20] border border-[#703348] text-[#ffd9e2] self-start"
                ].join(" ")}
              >
                {m.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-2 border-t border-slate-700/40">
        <input
          className="flex-1 rounded-xl bg-slate-900/70 border border-slate-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-200 placeholder-slate-500"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Ask something in the Aadi-verse..."
          disabled={busy}
        />
        <button
          onClick={send}
          disabled={busy}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 disabled:opacity-60 text-white font-medium shadow"
        >
          {busy ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
