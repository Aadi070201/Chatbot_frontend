import Chat from "../components/chat";

export default function Page() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent drop-shadow">
            Aadi Verse 
          </h1>
          <p className="text-sm md:text-base text-slate-300">
            A Nutrition Bot
          </p>
        </header>

        {/* Chat */}
        <div className="card p-4 md:p-6">
          <Chat />
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400">
          Crafted By <span className="text-fuchsia-300 font-semibold">Aadi</span>
        </footer>
      </div>
    </main>
  );
}
